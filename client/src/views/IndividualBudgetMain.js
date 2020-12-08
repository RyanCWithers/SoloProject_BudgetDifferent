import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from '@reach/router';
import DeleteBudgetItem from '../components/DeleteBudgetItem';
import {ResponsiveContainer,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import bigMac from './images/bigMac.png';
import pairJordans from './images/pairAirJordans.png';
import pumpkinSpice from './images/pumpkinSpice.png';
import dietCokeMcdonalds from './images/dietCokeMcdonalds.png';
import ihopPancakes from './images/ihopPancakes.png';
import songsItunes from './images/songsItunes.png';
import averageGas from './images/averageGas.png';

const IndividualBudgetMain = props =>{
    const [budgetItems, setBudgetItems] = useState([]);
    const [budget, setBudget] = useState({
        budgetMonth: '',
        budgetYear: '',
        budgetPayAmount: 0,
        budgetHoursWorked: 0
    });
    const [loaded, setLoaded] = useState(false);
    let budgetData = [
        {name: "Food", val: 0, ct: 0},
        {name: "Shopping", val: 0,ct: 0},
        {name: "Investments", val: 0, ct: 0},
        {name: "Recurring", val: 0, ct: 0},
        {name: "Medical", val: 0, ct: 0}
    ];
    const youCouldHaveObj = {
        bigMac: {price: 3.99, sentence: 'Big Macs'},
        ihopPancakes:{price: 5.79, sentence: 'Stacks of Pancakes'},
        songsItunes:{price: 1.29, sentence: 'Songs on iTunes'},
        averageGas: {price: 2.60, sentence: 'Gallons of Gasoline, on average'},
        pumpkinSpice: {price: 5.25, sentence: 'Venti Pumpkin Spice Lattes'},
        pairJordans: {price: 160, sentence: 'Pairs of Air Jordan 1s'},
        dietCokeMcDonalds: {price: 1, sentence: "Diet Cokes at McDonald's"} 

    };
    useEffect(() =>{
        axios.get('http://localhost:8000/api/budgetdifferent/' + props.id)
            .then(res => {
                setBudgetItems(res.data.budgetItems);
                setBudget({
                    budgetMonth: res.data.budgetMonth,
                    budgetYear: res.data.budgetYear,
                    budgetPayAmount: res.data.budgetPayAmount,
                    budgetHoursWorked: res.data.budgetHoursWorked
                });
                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, [props.id]);

    const removeFromDom = removeId =>{
        setBudgetItems(budgetItems.filter(budgetItem => budgetItem._id !== removeId));
    };

    let budgetTotal = 0;
    if(loaded){
        budgetItems.map(item =>{
            budgetTotal+=item.itemAmount;
            if(item.itemCat === "Food"){
                budgetData[0].ct++;
                budgetData[0].val +=item.itemAmount; 
            }else if(item.itemCat === "Shopping"){
                budgetData[1].ct++;
                budgetData[1].val += item.itemAmount;
            }else if(item.itemCat === "Investments"){
                budgetData[2].ct++;
                budgetData[2].val += item.itemAmount;
            }else if(item.itemCat === "Recurring"){
                budgetData[3].ct++;
                budgetData[3].val += item.itemAmount;
            }else if(item.itemCat === "Medical"){
                budgetData[4].ct++;
                budgetData[4].val += item.itemAmount;
            }
        });
    };
    
    return(
        <div class = "pageContain">
            <div className = "container">
                <h1>{budget.budgetMonth} {budget.budgetYear}</h1>
                <ul>
                    <div className = "row mx-auto text-center">
                        <h4 className = "col">Description</h4>
                        <h4 className = "col">Category</h4>
                        <h4 className = "col">Type</h4>
                        <h4 className = "col">Amount</h4>
                        <h4 className = "col">Options</h4>
                    </div>
                    {
                        loaded?
                        budgetItems.map((item, index) =>(
                            <li key = {index} className = "row w-40 mx-auto text-center mt-2" style = {{color: "white"}}>
                                <div className = "col">{item.itemDesc}</div>
                                <div className = "col">{item.itemCat}</div>
                                <div className = "col">{item.itemType}</div>
                                <div className = "col">{item.itemAmount}</div>
                                <div className = "col">
                                    <DeleteBudgetItem 
                                        budgetId = {props.id} 
                                        budgetItemId = {item._id}
                                        successCallback = {() => removeFromDom(item._id)}
                                    />
                                </div>
                            </li>
                        )):
                        null
                    }
                </ul>
                <Link to={'/api/budgetdifferent/' + props.id + '/new'}>
                        <button className="btn btn-light my-2">Create Item</button>
                </Link>
                <Link to="/api/budgetdifferent">
                    <button className = "btn btn-primary btn-sm ml-2">Home</button>
                </Link>
            </div>
            {
                loaded?
                <div>
                    <div class = 'infoBox' id = "monthtotal">
                        <h3>Your Monthly Totals:</h3>
                        <p>You worked for <strong>{budget.budgetHoursWorked}</strong> hours.</p>
                        <p>You made a total of <strong>${budget.budgetPayAmount}</strong>.</p>
                        <p>You spent <strong>${budgetTotal}</strong>.</p>
                        <p>You saved <strong>${budget.budgetPayAmount - budgetTotal}</strong>.</p>
                    </div>
                    <div class = 'infoBox' id= "didYouKnow">
                        <h3>With The Money That You Spent, You Could Have Bought...</h3>
                        <div class = "infoGraphics">
                            <img src={bigMac} alt="Big Mac" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.bigMac.price)}</strong> {youCouldHaveObj.bigMac.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={ihopPancakes} alt="Pancakes" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.ihopPancakes.price)}</strong> {youCouldHaveObj.ihopPancakes.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={songsItunes} alt="Songs" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.songsItunes.price)}</strong> {youCouldHaveObj.songsItunes.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={pairJordans} alt="Shoes" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.pairJordans.price)}</strong> {youCouldHaveObj.pairJordans.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={dietCokeMcdonalds} alt="Soda" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.dietCokeMcDonalds.price)}</strong> {youCouldHaveObj.dietCokeMcDonalds.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={pumpkinSpice} alt="Coffee" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.pumpkinSpice.price)}</strong> {youCouldHaveObj.pumpkinSpice.sentence}</p>
                        </div>
                        <div class = "infoGraphics">
                            <img src={averageGas} alt="Gas" height = '100' class = "infoImg"></img>
                            <p class = "infoPara"><strong>{Math.floor(budgetTotal / youCouldHaveObj.averageGas.price)}</strong> {youCouldHaveObj.averageGas.sentence}</p>
                        </div>
                    </div>
                    <div className = "card" class = "individGraph" id="firstGraph">
                        <h4>Spending by Category</h4>
                        <ResponsiveContainer height={300}>
                            <BarChart
                                data = {budgetData}
                                margin = {{top: 20, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray = "3 3"/>
                                <XAxis dataKey = "name" />
                                <YAxis  label={{ value: 'Amount ($)', angle: -90 , position: "insideLeft"}}/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey= "val" fill="#17a2b8" name="Dollars Spent"/>
                            </BarChart>
                        </ResponsiveContainer>
                        
                    </div>
                    <div className = "card" class = "individGraph" id="secondGraph">
                        <h4>Number of Entries by Category</h4>
                        <ResponsiveContainer  height={300}>
                            <BarChart
                                width = {750}
                                height = {300}
                                data = {budgetData}
                                margin = {{top: 20, right: 30, left: 20, bottom: 5}}
                            >
                                <CartesianGrid strokeDasharray = "3 3"/>
                                <XAxis dataKey = "name"/>
                                <YAxis label={{ value: 'Count', angle: -90 , position: "insideLeft"}}/>
                                <Tooltip/>
                                <Legend />
                                <Bar dataKey= "ct" fill="#17a2b8" name="Count"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    
                </div>
                :
                null
            }
            
        </div>
    )
};

export default IndividualBudgetMain;