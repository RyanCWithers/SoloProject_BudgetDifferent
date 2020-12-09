import axios from 'axios';
import React, {useState} from 'react';
import BudgetForm from '../components/BudgetForm';
import {navigate} from '@reach/router';
import CancelButton from '../components/CancelButton';

const BudgetCreate = props =>{
    const [errs, setErrs] = useState({});
    const budget ={
        budgetMonth: '',
        budgetYear: '',
        budgetPayAmount: '',
        budgetHoursWorked: '',
        budgetItems: []
    };

    const createBudget = createdBudget =>{
        axios.post('http://localhost:8000/api/budgetdifferent/new', createdBudget.state)
            .then((res) => {
                if(res.data.errors){
                    setErrs(res.data.errors);
                }else{
                    navigate('/api/budgetdifferent');
                }
             })
            .catch(err => console.log(err))
    };
    return(
        <div className = "pageContain">
            <h1>Create a Monthly Budget</h1>
            <BudgetForm budget = {budget} onSubmitProp = {createBudget} errs={errs} cancelId = {null}/>
        </div>
    )
}

export default BudgetCreate;