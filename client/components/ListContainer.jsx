import React from 'react';
//import { render } from 'sass';

import TextBox from './TextBox.jsx';



class ListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks : []
        }

        

        // this.deleteTask = this.deleteTask.bind(this)
    }

    async deleteTask(e) {
        
        await fetch('api/tasks/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify({key: e.target.value})
        })
        .catch(err => console.log('ListContainer.deleteTask: delete tasks: ERROR: ', err));
        //console.log(e.target.value)
    }

    async updateTask(e) {
        console.log(e.target.checked)
        // if(e.target.checked) {
        //     document.getElementById(e.target.id).checked = await true
        // } else {
        //     document.getElementById(e.target.id).checked = await false
        // }
        //document.getElementById(e.target.id).checked = await true
        fetch('api/tasks/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify({done: e.target.checked,
                key: e.target.value
            })
        })
        .catch(err => console.log('ListContainer.deleteTask: delete tasks: ERROR: ', err));
        console.log(e.target)
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

    componentDidUpdate(prevProps, prevState) {
    //     fetch('/api/tasks', {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then((tasks) => {
    //             if(!Array.isArray(tasks)) tasks = [];
    //             return this.setState({
    //                 tasks
    //             })
    //         })
    //         .catch(err => console.log('ListContainer.componentDidMount: get tasks: ERROR: ', err));
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
        const parsedTasks =[]
        
            
        for(let i = 0; i < tasks.length; i++){
            let doneOrNot = false
            if(tasks[i]['done'] === true){
                doneOrNot = true
            }
            parsedTasks.push(
                <div key = {i+1}>{tasks[i]['content']}
                    <button tag = {'button'+(i+1)} onClick = {this.deleteTask} value = {tasks[i]['taskid']}> {'Delete'}
                    </button>
                    <input type="checkBox" id={'checkBox'+(i+1)} value = {tasks[i]['taskid']} checked={tasks[i]['done']} onChange = {this.updateTask}>
                        
                    </input><label htmlFor ={'checkBox'+(i+1)}>Done</label>
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