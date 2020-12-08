import axios from 'axios';
import React, {useEffect, useState} from 'react';
import BudgetList from '../components/BudgetList';
import {Link} from '@reach/router';
import {
    ResponsiveContainer, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    Radar, 
    Tooltip, 
    PolarRadiusAxis,
    BarChart,
    Bar,
    CartesianAxis,
    XAxis,
    YAxis
    } from 'recharts';

const Main = props =>{
    const [budgets, setBudgets] = useState([]);
    const [loaded, setLoaded]= useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/budgetdifferent')
            .then(res => {
                setBudgets(res.data);
                setLoaded(true);
            })
            .catch(err =>console.log(err))
    },[]);

    const removeFromDom = (budgetId) =>{
        setBudgets(budgets.filter(item => item._id !== budgetId));
    };

    let budgetData = [
        {
            name: "Food",
            val: 0,
            ct: 0
        },
        {
            name: "Shopping",
            val: 0,
            ct: 0
        },
        {
            name: "Investments",
            val: 0,
            ct: 0
        },
        {
            name: "Recurring",
            val: 0,
            ct: 0
        },
        {
            name: "Medical",
            val: 0,
            ct: 0
        }
    ];

    let monthData = [];
    if(loaded){
        budgets.map(item =>{
            let monthAmountCount = 0;
            item.budgetItems.map(otherItem =>{
                monthAmountCount+=otherItem.itemAmount;
                if(otherItem.itemCat ==="Food"){
                    budgetData[0].val += otherItem.itemAmount;
                    budgetData[0].ct ++;
                }else if(otherItem.itemCat ==="Shopping"){
                    budgetData[1].val += otherItem.itemAmount;
                    budgetData[1].ct ++;
                }else if(otherItem.itemCat ==="Investments"){
                    budgetData[2].val += otherItem.itemAmount;
                    budgetData[2].ct ++;
                }else if(otherItem.itemCat ==="Recurring"){
                    budgetData[3].val += otherItem.itemAmount;
                    budgetData[3].ct ++;
                }else if(otherItem.itemCat ==="Medical"){
                    budgetData[4].val += otherItem.itemAmount;
                    budgetData[4].ct ++;
                }
            })
            monthData.push({
                budgetId : item._id,
                budgetLabel: item.budgetMonth+' '+item.budgetYear,
                budgetTotal: monthAmountCount
            });
        })
        console.log(monthData);
    }
    return(
        <div class = "pageContain">
            <h1>Welcome to BudgetDifferent!</h1>
            <p>A different way to look at money</p>
            <div className = "card text-center p-4" id="monthBudgets">
                <h3 className="card-title">Monthly Budgets: </h3>
                {
                    loaded?
                    <BudgetList budgets = {budgets} removeFromDom = {removeFromDom} className = "card-body"/>:
                    null
                }
                <Link to={'/api/budgetdifferent/new'}>
                    <button className="btn btn-info btn-lg my-2">Create Budget</button>
                </Link>
            </div>
            <div>
                {
                    loaded?
                    <div>
                        <div class="individGraph" id="radar">
                            <h4>Spending Tendencies by Amount</h4>
                            <ResponsiveContainer height={500}>
                                <RadarChart outerRadius = {200} height = {250} data={budgetData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="name" />
                                    <PolarRadiusAxis angle = {30}/>
                                    <Radar name="Total Spending ($)" dataKey = "val" stroke = "lightgreen" fill="lightgreen" fillOpacity = {0.6} />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                        <div class="individGraph" id="totalBar">
                            <h4>Total Spending Overall</h4>
                            <ResponsiveContainer height={500}>
                                <BarChart
                                    width = {300}
                                    height = {500}
                                    data= {monthData}
                                    margin = {{top: 20, right: 30, left: 20, bottom: 5}}
                                >
                                    <CartesianAxis strokeDasharray= "3 3"/>
                                    <XAxis dataKey = "budgetLabel"/>
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey = "budgetTotal" fill="green" name = "Total Spent ($)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
            
            
        </div>
    )
};

export default Main;