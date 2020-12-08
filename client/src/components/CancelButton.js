import React from 'react';
import {navigate} from '@reach/router';

const CancelButton = props =>{
    const {cancelId} = props;
    const onClickHandler = () =>{
        if(cancelId!=null){
            navigate("/api/budgetdifferent/"+cancelId);
        }else{
            navigate("/api/budgetdifferent");
        }
        
    };
    return(
        <button 
            onClick = {onClickHandler}
            className="btn btn-light btn-lg w-50 mx-auto"
        >Cancel</button>
    )
};

export default CancelButton;