import React from 'react';
import {Link} from '@reach/router';
import DeleteBudget from '../components/DeleteBudget';

const BudgetList = props =>{

    return(
        <ul className = "list-group-flush mx-auto" id="allBudgets">
            {props.budgets.map((item, index) =>(
                <li key={index} className = "list-group-item" class="budgetList">
                    <ul className = "list-group list-group-horizontal-md">
                        <li className = "list-group-item w-50">
                            <Link to={"/api/budgetdifferent/" + item._id}>
                                <span>{item.budgetMonth} {item.budgetYear}</span>
                            </Link>
                        </li>
                        <li className = "list-group-item">
                            <Link to = {"/api/budgetdifferent/" + item._id + "/edit"} >
                                <button className = "btn btn-secondary">Edit</button>
                            </Link>
                        </li>
                        <li className = "list-group-item">
                            <DeleteBudget budgetId = {item._id} successCallback ={() => props.removeFromDom(item._id)}/>
                        </li>
                    </ul>
                    
                </li>
            ))}
        </ul>
    )
};

export default BudgetList;