import React from 'react';
//import { render } from 'sass';

import TextBox from './TextBox.jsx';

const getInput = async (e) => {
    if (e.key === 'Enter'){
        const input = await document.getElementById('textbox').value;
        console.log(input)
        await fetch('api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify({text:input})
        })
       // .then((res) => this.setState({
                        //tasks
        //            }))
        document.getElementById('textbox').value = '';
    }
    
}

class ListContainer extends React.Component {
    constructor(props) {
        super(props)
        

        

        // this.deleteTask = this.deleteTask.bind(this)
    }
    getInput = async (e) => {
        if (e.key === 'Enter'){
            const input = await document.getElementById('textbox').value;
            console.log(input)
            await fetch('api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({text:input})
            })
           // .then((res) => this.setState({
                            //tasks
            //            }))
            document.getElementById('textbox').value = '';
        }
        
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

    componentDidUpdate(nextProps, nextState) {
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
                <div>
                    Do something you lazy fuck
                    <div className='textboxContainer'>
                    
                    <span>New Task: </span>
                    <input 
                        type="text" 
                        id="textbox" 
                        name="fname" 
                        onKeyDown = {getInput}
                        >
                    </input>
                
                    </div>
                </div>
                
          );
        } 
        const parsedTasks =[]
        
            
        for(let i = 0; i < tasks.length; i++){
            let doneOrNot = false
            if(tasks[i]['done'] === true){
                doneOrNot = true
            }
            parsedTasks.push(
                <div className ='taskContainer' key= {'taskContainer'+i}>
                    <div className = 'task' key = {i+1}>{tasks[i]['content']}</div>
                        <div className = 'deleteBox' key= {'deleteBox'+i}>
                            <button className ='delete' tag = {'button'+(i+1)} onClick = {this.deleteTask} value = {tasks[i]['taskid']}> {'Delete'}
                            </button>
                        </div>
                        <div className = 'doneBox' key= {'doneBox'+i}>
                            <input type="checkBox" id={'checkBox'+(i+1)} value = {tasks[i]['taskid']} checked={tasks[i]['done']} onChange = {this.updateTask}>
                            
                            </input><label htmlFor ={'checkBox'+(i+1)}>Done</label>
                        </div>
                        
                    
                </div>
                )
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