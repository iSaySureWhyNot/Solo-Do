import React, { Component } from 'react';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
import ListContainer from './ListContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props)
    }
    //console.log(res.locals.tasks);
    render(){
        return (
            <div className ="appContain">
                
                <ListContainer />
            </div>
            
            
        )
        
    }
}

export default App;