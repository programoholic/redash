import React from "react";

const keyManagement = (props) => {
  const { key, value } = props.row.values;
  console.log(key, value, props.row);
  return (
    <div>
      <h6>Going to delete permanently : {key} </h6>
      <span>I hope you're aware what
      you're doing! </span>
    </div>
  );
};
export default keyManagement;
