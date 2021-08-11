import React from 'react';
//import { render } from 'sass';

import TextBox from './TextBox.jsx';



class ListContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then((tasks) => {
                if(!Array.isArray(tasks)) tasks = [];
                return this.setState({
                    tasks
                })
            })
            .catch(err => console.log('ListContainer.componentDidMount: get tasks: ERROR: ', err));
    }
    
    render(){
        if (!this.state) return (
            <div>
              <h1>Loading data, please wait...</h1>
            </div>
          );
        console.log('this state:', this.state)
        const { tasks } = this.state
        console.log(tasks)

        if (!tasks.length) {
            return (
            <div>Sorry, no tasks found</div>
          );
        } 
        
        //const taskElems = ()
        
        return(
        <div>
            <TextBox/>
            <ul>
               <li>{tasks[0]['content']}</li> 
            </ul>
            
        </div>
        )
    }
    

    
}

export default ListContainer;