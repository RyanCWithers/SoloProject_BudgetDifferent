import './App.css';
import Main from './views/Main';
import BudgetCreate from './views/BudgetCreate';
import BudgetUpdate from './views/BudgetUpdate';
import BudgetItemCreate from './views/BudgetItemCreate'
import {Router} from '@reach/router';
import IndividualBudgetMain from './views/IndividualBudgetMain';

function App() {
  return (
    <div className="App">
      <Router>
        <Main path="/api/budgetdifferent/"/>
        <BudgetCreate path="/api/budgetdifferent/new/"/>
        <BudgetUpdate path="/api/budgetdifferent/:id/edit"/>
        <IndividualBudgetMain path="/api/budgetdifferent/:id"/>
        <BudgetItemCreate path="/api/budgetdifferent/:id/new"/>
      </Router>
    </div>
  );
}

export default App;
