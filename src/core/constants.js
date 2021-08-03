import React from 'react';
export const searchColDefinitions = [
    {
      Header: "Key",
      accessor: "key" // accessor is the "key" in the data
    },
    {
      Header: "Value",
      accessor: "value"
    },
    {
        Header: "Expires In",
        accessor: "ttl"
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: cell => (
          <button value={cell.accessor}>
            delete
          </button>)
              }

  ];
export const PAGE_SIZE_ARRAY = [10, 25, 50, 100];
  