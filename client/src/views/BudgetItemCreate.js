import React from 'react';
import BudgetItemForm from '../components/BudgetItemForm';
import axios from 'axios';
import { navigate } from '@reach/router';

const BudgetItemCreate = props =>{
    const budgetItem = {
        itemDesc: '',
        itemCat: '',
        itemType: '',
        itemAmount: ''
    };

    const createBudgetItem = createdBudgetItem =>{
        axios.post('http://localhost:8000/api/budgetdifferent/' + props.id + '/new', createdBudgetItem.state)
            .then(() => navigate('/api/budgetdifferent/' + props.id))
            .catch(err => console.log(err))
    };

    return(
        <div class="pageContain">
            <BudgetItemForm budgetItem = {budgetItem} onSubmitProp= {createBudgetItem} cancelId = {props.id}/>
        </div>
    )
};

export default BudgetItemCreate;