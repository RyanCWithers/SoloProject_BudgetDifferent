const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    budgetMonth: {type: String, required: [true, 'The month name is required.']},
    budgetYear: {type: String, required: [true, 'Please enter the year (XXXX).']},
    budgetPayAmount: {type: String, required: [true, 'Please enter the amount of money that you made this month.']},
    budgetHoursWorked: {type: String, required: [true, 'Enter the amount of hours that you worked.']},
    budgetItems: [
        {
            itemDesc: {type: String},
            itemAmount: {type: Number},
            itemCat: {type: String},
            itemType: {type: String}
        }
    ]
}, {timestamps: true})

module.exports.Budget = mongoose.model('Budget', BudgetSchema);