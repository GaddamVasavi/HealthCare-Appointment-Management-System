import React from 'react';
import Card from '../common/Card';
import { Badge } from '../common/Badge';
import { DataTable, Column } from '../common/DataTable';

interface LabResult {
  id: string;
  testName: string;
  category: string;
  result: number | string;
  unit: string;
  referenceRange: string;
  flag: 'Normal' | 'High' | 'Low' | 'Critical';
  date: string;
}

interface LabResultsPanelProps {
  results: LabResult[];
  patientName: string;
}

export const LabResultsPanel: React.FC<LabResultsPanelProps> = ({ results, patientName }) => {
  const columns: Column<LabResult>[] = [
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Test Name', accessor: 'testName', sortable: true },
    { 
      header: 'Result', 
      accessor: (row) => (
        <span style={{ fontWeight: row.flag !== 'Normal' ? 600 : 400, color: row.flag === 'Critical' ? 'var(--danger-color)' : 'inherit' }}>
          {row.result} {row.unit}
        </span>
      )
    },
    { header: 'Reference Range', accessor: 'referenceRange' },
    { 
      header: 'Flag', 
      accessor: (row) => {
        let variant: 'success' | 'danger' | 'warning' | 'primary' = 'success';
        if (row.flag === 'High') variant = 'warning';
        if (row.flag === 'Low') variant = 'primary';
        if (row.flag === 'Critical') variant = 'danger';
        
        return <Badge variant={variant}>{row.flag}</Badge>;
      }
    }
  ];

  return (
    <Card 
      title={`Laboratory Results - ${patientName}`}
      subtitle={`${results.length} total tests available`}
      className="lab-results-panel"
    >
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fca5a5', flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#991b1b' }}>Critical Alerts</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {results.filter(r => r.flag === 'Critical').length} test(s) require immediate attention.
          </p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fcd34d', flex: 1 }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#92400e' }}>Abnormal Results</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {results.filter(r => r.flag === 'High' || r.flag === 'Low').length} test(s) outside normal range.
          </p>
        </div>
      </div>

      <DataTable 
        data={results} 
        columns={columns} 
        keyExtractor={(item) => item.id}
        pagination
        itemsPerPage={5}
      />
    </Card>
  );
};

export default LabResultsPanel;
