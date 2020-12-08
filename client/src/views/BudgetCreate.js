import axios from 'axios';
import React from 'react';
import BudgetForm from '../components/BudgetForm';
import {navigate} from '@reach/router';
import CancelButton from '../components/CancelButton';

const BudgetCreate = props =>{
    const budget ={
        budgetMonth: '',
        budgetYear: '',
        budgetPayAmount: '',
        budgetHoursWorked: '',
        budgetItems: []
    };

    const createBudget = createdBudget =>{
        axios.post('http://localhost:8000/api/budgetdifferent/new', createdBudget.state)
            .then(() => navigate('/api/budgetdifferent'))
            .catch(err => console.log(err))
    };
    return(
        <div className = "pageContain">
            <h1>Create a Monthly Budget</h1>
            <BudgetForm budget = {budget} onSubmitProp = {createBudget}/>
        </div>
    )
}

export default BudgetCreate;