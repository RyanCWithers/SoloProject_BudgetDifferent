import React, {useEffect, useState} from 'react';
import BudgetForm from '../components/BudgetForm';
import axios from 'axios';
import { navigate } from '@reach/router';
import DeleteBudget from '../components/DeleteBudget';

const BudgetUpdate = props =>{
    const [budget, setBudget] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [errs, setErrs] = useState({});
    useEffect(()=>{
        axios.get('http://localhost:8000/api/budgetdifferent/' + props.id)
            .then(res =>{
                setBudget(res.data);
                setLoaded(true);
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [props.id])

    const updateBudget = updatedBudget =>{
        axios.put('http://localhost:8000/api/budgetdifferent/' + props.id, updatedBudget.state)
            .then(res => {
                if(res.data.errors){
                    setErrs(res.data.errors);
                }else{
                    setBudget(res.data);
                    navigate('/api/budgetdifferent');
                    console.log(res);
                }                
            })
            .catch(err => console.log(err))
    };

    return(
        <div>
            {
                loaded?
                <div className = "pageContain">
                    <h1>Edit {budget.budgetMonth} {budget.budgetYear}</h1>
                    <BudgetForm budget = {budget} onSubmitProp = {updateBudget} cancelId = {null} errs={errs}/>
                    <DeleteBudget budgetId = {budget._id}/>
                </div>:
                null
            }
            
        </div>
    )
};

export default BudgetUpdate;