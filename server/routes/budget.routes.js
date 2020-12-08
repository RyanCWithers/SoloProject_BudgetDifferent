const BudgetController = require('../controllers/budget.controller');

module.exports = app =>{
    app.post('/api/budgetdifferent/new', BudgetController.createBudget);
    app.get('/api/budgetdifferent', BudgetController.displayAllBudgets);
    app.get('/api/budgetdifferent/:id', BudgetController.displaySingleBudget);
    app.put('/api/budgetdifferent/:id', BudgetController.updateBudgetInfo);
    app.delete('/api/budgetdifferent/:id', BudgetController.deleteBudget);


    app.post('/api/budgetdifferent/:id/new', BudgetController.createBudgetItem);
    app.delete('/api/budgetdifferent/:id/:itemId', BudgetController.deleteBudgetItem);
    // app.put('/api/budgetdifferent/:id/:itemId/edit', BudgetController.updateBudgetItem);
};