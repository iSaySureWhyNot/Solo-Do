import React, { Component } from 'react';
import ListContainer from './ListContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div>Things to do

                <ListContainer />
            </div>
            
            
        )
        
    }
}

export default App;