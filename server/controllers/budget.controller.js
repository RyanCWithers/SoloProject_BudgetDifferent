const {Budget} = require('../models/budget.model');

module.exports.createBudget = (req, res) =>{
    const {budgetMonth, budgetYear, budgetPayAmount, budgetHoursWorked, budgetItems} = req.body;
    Budget.create({
        budgetMonth,
        budgetYear,
        budgetPayAmount,
        budgetHoursWorked,
        budgetItems
    })
        .then(budget => res.json(budget))
        .catch(err => res.json(err))
};

module.exports.displayAllBudgets = (req, res) =>{
    Budget.find({})
        .then(budgets => res.json(budgets))
        .catch(err => res.json(err))
};

module.exports.displaySingleBudget = (req, res) =>{
    Budget.findOne({_id: req.params.id})
        .then(singleBudget => res.json(singleBudget))
        .catch(err => res.json(err))
};

module.exports.updateBudgetInfo = (req, res) =>{
    Budget.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedInfo => res.json(updatedInfo))
        .catch(err => res.json(err))
};

module.exports.deleteBudget = (req, res) =>{
    Budget.deleteOne({_id: req.params.id})
        .then(success => res.json(success))
        .catch(err => res.json(err))
};

module.exports.createBudgetItem = (req, res) =>{
    Budget.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {budgetItems: req.body}},
        {new:true}
    )
        .then(newItem => res.json(newItem))
        .catch(err => res.json(err))
};

module.exports.deleteBudgetItem = (req, res) =>{
    Budget.findOneAndUpdate(
        {_id: req.params.id},
        {$pull: {budgetItems:{_id: req.params.itemId}}},
        {new: true}
    )
        .then(result => res.json(result))
        .catch(err => res.json(err))
};
