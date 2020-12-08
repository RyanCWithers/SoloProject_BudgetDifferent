import React, {useReducer} from 'react';
import CancelButton from './CancelButton';

function reducer(state, action) {
    return({
        ...state,
        [action.type]: action.payload
    });
};

const BudgetForm = props =>{
    const {budget, onSubmitProp, cancelId} = props;

    const initialState = {
        budgetMonth: budget.budgetMonth,
        budgetYear: budget.budgetYear,
        budgetPayAmount: budget.budgetPayAmount,
        budgetHoursWorked: budget.budgetHoursWorked,
        budgetItems: budget.budgetItems
    };
    
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        const {name, value} = e.target;
        dispatch({
            type: name,
            payload: value
        });
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        // axios.post('http://localhost:8000/api/budgetdifferent/new', state)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))

        onSubmitProp({state});
    };
    return(
        <div>
            <form onSubmit = {onSubmitHandler} className = "card w-50 mx-auto mt-2">
                <h2 className = "card title">Monthly Budget</h2>
                <div className = "card-body">
                    <div className = "form-group">
                        <label className = "text-info">Month: </label>
                        <input 
                            type= "text"
                            name = "budgetMonth"
                            value = {state.budgetMonth}
                            onChange = {handleChange}
                            className = "form-control w-50 mx-auto text-center"
                        />
                    </div>
                    <div className = "form-group">
                        <label className = "text-info">Year: </label>
                        <input 
                            type= "text"
                            name = "budgetYear"
                            value = {state.budgetYear}
                            onChange = {handleChange}
                            className = "form-control w-50 mx-auto text-center"
                        />
                    </div>
                    <div className = "form-group">
                        <label className = "text-info">Total Monthly Pay: </label>
                        <input 
                            type= "text"
                            name = "budgetPayAmount"
                            value = {state.budgetPayAmount}
                            onChange = {handleChange}
                            className = "form-control w-50 mx-auto text-center"
                        />
                    </div>
                    <div className = "form-group">
                        <label className = "text-info">Total Hours Worked: </label>
                        <input 
                            type= "text"
                            name = "budgetHoursWorked"
                            value = {state.budgetHoursWorked}
                            onChange = {handleChange}
                            className = "form-control w-50 mx-auto text-center"
                        />
                    </div>
                    <input 
                        type = "submit"
                        value = "Submit"
                        className = "btn btn-info btn-lg"
                    />
                    
                </div>
            </form>
            <CancelButton cancelId = {cancelId}/>
        </div>
    )
};

export default BudgetForm;