import React from "react";
import { useTable, useRowSelect } from "react-table";
import BTable from "react-bootstrap/Table";
import Paginate from './Paginate'
import IndeterminateCheckbox from "./selection";
const grid = (props) => {
  const data = React.useMemo(() => props.rows, [props.rows]);
  const columns = React.useMemo(() => props.colDefinitions, [props.columns]);
  const selectionChanged = (e) =>{
    console.log('#### selecttion changed : ',tableInstance.selectedFlatRows)
  }
  const tableInstance = useTable({ columns, data }, useRowSelect, (hooks) => {
    if (!props.rowSelection) {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div onClick={ (ea) => selectionChanged(ea) }>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    state: { selectedRowIds },
  } = tableInstance;
  const headers = headerGroups.map((headerGroup) => (
    // Apply the header row props
    <tr {...headerGroup.getHeaderGroupProps()}>
      {
        // Loop over the headers in each row
        headerGroup.headers.map((column) => (
          // Apply the header cell props
          <th {...column.getHeaderProps()}>
            {
              // Render the header
              column.render("Header")
            }
          </th>
        ))
      }
    </tr>
  ));
  const body = rows.map((row) => {
    prepareRow(row);
    return (
      // Apply the row props
      <tr {...row.getRowProps()}>
        {
          // Loop over the rows cells
          row.cells.map((cell) => {
            // Apply the cell props
            return (
              <td {...cell.getCellProps()}>
                {
                  // Render the cell contents
                  cell.render("Cell")
                }
              </td>
            );
          })
        }
      </tr>
    );
  });
  return (
    <>
      <BTable
       {...props.tableProps}
        {...getTableProps()}
      >
        <thead>{headers}</thead>
        <tbody {...getTableBodyProps()}>{body}</tbody>
      </BTable>
      {props.paginate &&
      (
        <Paginate
          {...{
            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,
            pageIndex,
            pageSize,
          }}
          totalRecords={data.length}
        />
      )}
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  );
};

export default grid;
