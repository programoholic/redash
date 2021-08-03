import React from "react";
import Grid from "../UI/grid/grid";
import classes from "./resultgrid.module.css";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Card from "../UI/card/card";
import Button from '../UI/input/button'
const resultGrid = (props) => {
  console.log(props);
  const handleEdit=(a)=>{
    console.log('&&&&&&&&&& : ',a)
  }
  const handleClickGroup = (a) => {
    console.log("&&& : ", a);
  };
  const searchColDefinitions = [
    {
      Header: "Key",
      accessor: "key", // accessor is the "key" in the data
    },
    {
      Header: "Value",
      accessor: "value",
    },
    {
      Header: "Expires In",
      accessor: "ttl",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (value) => (
        <>
        <Button variant="light btn-sm" className={classes.DelBtn} clicked={()=>{props.onRowEdit(value)}}>
          <Edit title="Delete key"  />
          </Button>
          <Button variant="light btn-sm" className={classes.DelBtn} clicked={()=>{props.onRowDelete(value)}}>
          <Delete title="Delete key" />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className={classes.Grid}>
      <Card title={`Showing results for : ${props.pattern}`}>
        <Grid
          rows={props.rows}
          colDefinitions={searchColDefinitions}
          rowSelection={true}
          paginate={false}
          selectionChanged={(selectedRows) =>
            props.selectionChanged(selectedRows)
          }
        />
      </Card>
    </div>
  );
};
export default resultGrid;
