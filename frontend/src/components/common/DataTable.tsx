import React, { useState, useMemo } from 'react';
import '../styles/DataTable.css';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  pagination?: boolean;
  itemsPerPage?: number;
  emptyMessage?: string;
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  selectable = false,
  onSelectionChange,
  pagination = false,
  itemsPerPage = 10,
  emptyMessage = 'No data available',
  isLoading = false,
  onRowClick,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: number; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const column = columns[sortConfig.key];
        const aValue = typeof column.accessor === 'function' ? column.accessor(a) : a[column.accessor];
        const bValue = typeof column.accessor === 'function' ? column.accessor(b) : b[column.accessor];

        if (aValue === bValue) return 0;
        
        // Handle string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        // Handle number/boolean comparison
        if (aValue != null && bValue != null && aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue != null && bValue != null && aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        
        return 0;
      });
    }
    return sortableItems;
  }, [data, columns, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, pagination, currentPage, itemsPerPage]);

  const handleSort = (index: number) => {
    if (!columns[index].sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: index, direction });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allKeys = new Set(paginatedData.map(keyExtractor));
      setSelectedKeys(allKeys);
      onSelectionChange?.(Array.from(allKeys));
    } else {
      setSelectedKeys(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    const newSelected = new Set(selectedKeys);
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    setSelectedKeys(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const renderCellContent = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return item[column.accessor] as React.ReactNode;
  };

  return (
    <div className="datatable-container">
      <div className="datatable-wrapper">
        <table className="datatable">
          <thead>
            <tr>
              {selectable && (
                <th className="datatable-th datatable-checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={paginatedData.length > 0 && selectedKeys.size === paginatedData.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`datatable-th ${col.sortable ? 'sortable' : ''}`}
                  style={{ width: col.width, textAlign: col.align || 'left' }}
                  onClick={() => handleSort(index)}
                >
                  <div className="th-content">
                    {col.header}
                    {col.sortable && sortConfig?.key === index && (
                      <span className="sort-icon">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="datatable-loading">
                  Loading data...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="datatable-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const key = keyExtractor(item);
                const isSelected = selectedKeys.has(key);
                return (
                  <tr 
                    key={key} 
                    className={`datatable-row ${isSelected ? 'selected' : ''} ${onRowClick ? 'clickable' : ''}`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selectable && (
                      <td className="datatable-td datatable-checkbox-col" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(key, e.target.checked)}
                        />
                      </td>
                    )}
                    {columns.map((col, index) => (
                      <td 
                        key={index} 
                        className="datatable-td"
                        style={{ textAlign: col.align || 'left' }}
                      >
                        {renderCellContent(item, col)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="datatable-pagination">
          <span className="pagination-info">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="pagination-controls">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-current">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
