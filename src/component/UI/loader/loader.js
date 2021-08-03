import React from 'react';
import classes from './loader.module.css';

const loader = (props) =>{
    return  (
        <div className={classes.loading}>
        <div className={classes.ring}>
          <div></div>
        </div>
      </div>
    )
}
export default loader;