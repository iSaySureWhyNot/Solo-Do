import React from 'react';
//import { render } from 'sass';

import TextBox from './TextBox.jsx';



class ListContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        fetch('/api/tasks', {
            method: 'GET'
        })
            .then(res => res.json())
            .then((tasks) => {
                if(!Array.isArray(tasks)) tasks = [];
                return this.setState({
                    tasks
                })
            })
            .catch(err => console.log('ListContainer.componentDidMount: get tasks: ERROR: ', err));
    }

    componentDidUpdate() {
        // fetch('/api/tasks', {
        //     method: 'GET'
        // })
        //     .then(res => res.json())
        //     .then((tasks) => {
        //         if(!Array.isArray(tasks)) tasks = [];
        //         return this.setState({
        //             tasks
        //         })
        //     })
        //     .catch(err => console.log('ListContainer.componentDidMount: get tasks: ERROR: ', err));
    }

    
    
    render(){

        const deleteTask = () => {
            fetch('api/tasks/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({key: this.key})
            })
            console.log(this.key)
        }

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
        const parsedTasks =[]
        
            
        for(let i = 0; i < tasks.length; i++){
            parsedTasks.push(
                <div key = {i}>{tasks[i]['content']}
                    <button key = {'button'+i} onClick = {deleteTask}>
                    </button>
                </div>)
        }
            
        
        console.log('parsed Tasks', parsedTasks)
        return(
        <div>
            <TextBox/>
            
               {parsedTasks} 
            
            
        </div>
        )
    }
    

    
}

export default ListContainer;