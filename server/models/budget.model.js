const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    budgetMonth: {type: String},
    budgetYear: {type: Number},
    budgetPayAmount: {type: Number},
    budgetHoursWorked: {type: Number},
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