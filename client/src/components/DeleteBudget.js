import React from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const DeleteButton = props =>{
    const {budgetId, successCallback} = props;

    const onClickHandler = () =>{
        axios.delete("http://localhost:8000/api/budgetdifferent/" + budgetId)
            .then(() =>{
                successCallback();
                navigate('/api/budgetdifferent');
            })
            .catch(err => console.log(err))
    };
    return(
        <button className = "btn btn-danger sm col-1" onClick = {onClickHandler}>Delete</button>
    )
};

export default DeleteButton;