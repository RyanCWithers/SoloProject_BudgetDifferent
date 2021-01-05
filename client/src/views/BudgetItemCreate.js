import React from 'react';
import BudgetItemForm from '../components/BudgetItemForm';
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from '../components/Navbar';

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
        <div>
            <Navbar />
            <div class="pageContain">
                <h1>Create a Budget Item</h1>
                <BudgetItemForm budgetItem = {budgetItem} onSubmitProp= {createBudgetItem} cancelId = {props.id}/>
            </div>
        </div>
        
    )
};

export default BudgetItemCreate;