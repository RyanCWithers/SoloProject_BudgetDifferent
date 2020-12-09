import React, {useReducer} from 'react';
import CancelButton from './CancelButton';
function reducer(state, action){
    return({
        ...state,
        [action.type] : action.payload
    });
};

const BudgetItemForm = props =>{
    const {budgetItem, onSubmitProp, cancelId} = props;

    const initialState = {
        itemDesc: budgetItem.itemDesc,
        itemAmount: budgetItem.itemAmount,
        itemCat: budgetItem.itemCat,
        itemType: budgetItem.itemType
    };

    const categoryObj = {
        "Food" : ['','Dining Out', 'Groceries', 'Fast Food'],
        "Shopping" : ['','Clothing', 'Technology', 'Home Goods'],
        "Investments" : ['','Retirement', 'Stocks', 'Other Investments'],
        "Medical" : ['','Copay', 'Prescriptions/Medicine'],
        "Recurring" : ['','Insurance', 'Rent/Mortgage', 'Utilities', 'Loans']
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
        onSubmitProp({state});
        
    }
    return(
        <div>
            <form onSubmit = {onSubmitHandler} className = "card w-50 mx-auto ">
                <div className = "card-body">
                    <div className = "form-group w-50 mx-auto">
                        <label className = "text-info">Category</label>
                        <select name = "itemCat" onChange = {handleChange} className = "form-control text-center">
                            <option value = ''></option>
                            <option value = "Food">Food</option>
                            <option value = "Shopping">Shopping</option>
                            <option value = "Investments">Investments</option>
                            <option value = "Medical">Medical</option>
                            <option value = "Recurring">Recurring</option>
                        </select>
                    </div>
                    <div className = "form-group w-50 mx-auto">
                        <label className = "text-info">Type</label>
                        <select name = "itemType" onChange = {handleChange} className = "form-control text-center">
                            {
                                (state.itemCat.length>0)?
                                categoryObj[state.itemCat].map((item, index) =>(
                                    <option key={index} value = {item}>{item}</option>
                                )):
                                null
                            }
                        </select>
                    </div>
                    <div className = "form-group w-50 mx-auto">
                        <label className = "text-info">Description</label>
                        <input
                            type = "text"
                            name = "itemDesc"
                            value = {state.itemDesc}
                            onChange = {handleChange}
                            className = "form-control text-center"
                        />
                    </div>
                    <div className = "form-group w-50 mx-auto">
                        <label className = "text-info">Amount</label>
                        <input 
                            type = "text"
                            name = "itemAmount"
                            value = {state.itemAmount}
                            onChange = {handleChange}
                            className = "form-control text-center"
                        />
                    </div>
                    <input
                        type="submit"
                        value= "Submit"
                        className = "btn btn-primary btn-lg"
                    />
                    
                </div>
                
            </form>
            <CancelButton cancelId = {cancelId}/>
        </div>
    )
};

export default BudgetItemForm;