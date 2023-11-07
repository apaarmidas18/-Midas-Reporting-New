import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
  } from 'react';
  import { createRoot } from 'react-dom/client';
  import { AgGridReact } from 'ag-grid-react';
//   import 'ag-grid-enterprise';
  import 'ag-grid-community/styles/ag-grid.css';
  import 'ag-grid-community/styles/ag-theme-alpine.css';
  
  const GridExample = () => {
    const containerStyle = useMemo(() => ({ maxWidth: '2000px', height: '1024px' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
      // set filters
      { field: 'athlete', filter: true },
      { field: 'country', filter: 'agSetColumnFilter' },
      // number filters
      { field: 'gold', filter: 'agNumberColumnFilter' },
      { field: 'silver', filter: 'agNumberColumnFilter' },
      { field: 'bronze', filter: 'agNumberColumnFilter' },
    ]);
    const defaultColDef = useMemo(() => {
      return {
        flex: 1,
        minWidth: 200,
        resizable: true,
        floatingFilter: true,
      };
    }, []);
  
    const onGridReady =  useCallback((params) => {
      fetch('http://ec2-3-239-97-174.compute-1.amazonaws.com:9291/api/allvms/getAllOpenFeeds')
        .then((resp) => resp.json())
        .then((data) => Object.keys(data).map((item, index) => data[item]));
    }, []);
  
    return (
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    );
  };

  export default GridExample