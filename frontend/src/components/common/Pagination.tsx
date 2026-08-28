import React from 'react';
import '../styles/Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1
}) => {
  // Generate page numbers to display
  const fetchPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
      
      let pages: (number | string)[] = [];
      
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (endPage - startPage + 1);

      if (hasLeftSpill && !hasRightSpill) {
        const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
        pages = ['...', ...extraPages, ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)];
      } else if (!hasLeftSpill && hasRightSpill) {
        const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
        pages = [...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), ...extraPages, '...'];
      } else if (hasLeftSpill && hasRightSpill) {
        pages = ['...', ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i), '...'];
      }
      
      return [1, ...pages, totalPages];
    }
    
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  if (totalPages <= 1) return null;

  const pages = fetchPageNumbers();

  return (
    <nav className="pagination" aria-label="Pagination Navigation">
      <ul className="pagination-list">
        <li>
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            &laquo; Prev
          </button>
        </li>
        
        {pages.map((page, index) => {
          if (page === '...') {
            return <li key={`ellipsis-${index}`} className="pagination-ellipsis">&#8230;</li>;
          }
          
          return (
            <li key={index}>
              <button
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page as number)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          );
        })}
        
        <li>
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
