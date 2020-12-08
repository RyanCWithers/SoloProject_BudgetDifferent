import React from 'react';
import {Link} from '@reach/router';
import DeleteBudget from '../components/DeleteBudget';

const BudgetList = props =>{

    return(
        <ul className = "list-group-flush mx-auto container text-center" id="allBudgets">
            {props.budgets.map((item, index) =>(
                <li key={index} className = "list-group-item row my-6" class="budgetList">
                    <Link to={"/api/budgetdifferent/" + item._id}>
                        <span className = "col-6 mr-3">{item.budgetMonth} {item.budgetYear}</span>
                        </Link>
                    <Link to = {"/api/budgetdifferent/" + item._id + "/edit"} >
                        <button className = "btn btn-secondary col-1">Edit</button>
                    </Link>
                    <DeleteBudget budgetId = {item._id} successCallback ={() => props.removeFromDom(item._id)}/>
                </li>
            ))}
        </ul>
    )
};

export default BudgetList;