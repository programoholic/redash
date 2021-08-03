import React from 'react';
import Button from '../UI/input/button';

const actionButtons = (props) =>{
    return (
        <div>
          <Button  clicked={props.clicked}>
            Create
          </Button>
              <Button disabled={props.rows.length  === 1} clicked={props.clicked}>
            Edit
          </Button>
              <Button disabled={props.rows.length > 0} clicked={props.clicked}>
            Delete
          </Button>
        </div>
    )
}
export default actionButtons;