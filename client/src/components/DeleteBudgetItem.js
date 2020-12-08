import React from 'react';
import axios from 'axios';

const DeleteBudgetItem = props =>{
    const {budgetId,budgetItemId, successCallback} = props;
    const onClickHandler = () =>{
        axios.delete('http://localhost:8000/api/budgetdifferent/'+ budgetId + '/' + budgetItemId)
            .then(() => successCallback())
            .catch(err => console.log(err))
    }
    return(
        <button onClick = {onClickHandler} className ="btn btn-danger btn-sm">
            X
        </button>
    )
};

export default DeleteBudgetItem;