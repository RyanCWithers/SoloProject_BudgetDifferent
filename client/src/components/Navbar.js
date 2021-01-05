import React from 'react';
import { navigate } from '@reach/router';

const Navbar = props => {
    return(
        <nav className = "navbar navbar-expand-sm navbar-dark" style= {{backgroundColor: "#8884d8"}}>
            <div className = "container-fluid">
                <span className = "navbar-brand"><i>BudgetDifferent</i></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className = "collapse navbar-collapse" id="navbarNavAltMarkup" >
                    <div className = "navbar-nav">
                        <span className = "nav-link" onClick = {() => navigate('/api/budgetdifferent')}>Home</span>
                        <span className = "nav-link">Logout</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;