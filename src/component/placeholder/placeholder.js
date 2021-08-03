import React from 'react';
import classes from './placeholder.module.css';
import Card from '../UI/card/card';
const placeholder = (props) =>{
    return (
        <Card>
        <div className={classes.Placeholder}>
            <div className={classes.Circle}></div>
            <div>nothing to show  :(</div>
        </div>
        </Card>
    )
}
export default placeholder;