import React from 'react';
//import { render } from 'sass';

import TextBox from './TextBox.jsx';



class ListContainer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state
        this.getTasks = this.getTasks.bind(this);
        this.getInput = this.getInput.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTask = this.updateTask.bind(this)
        // this.deleteTask = this.deleteTask.bind(this)
    }
    
    async getTasks() {
        await fetch('/api/tasks', {
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

      getInput(e){
        if (e.key === 'Enter'){
            const input = document.getElementById('textbox').value;
            //console.log(input)
             fetch('api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text:input})
            }) 
            .then((res) => { 
                res.json()
            this.getTasks()
            })
            
            .then((data)=>console.log('in the then statement',+ data))
           
            .catch(err => console.log('ListContainer.componentDidMount: get tasks: ERROR: ', err));
           
           // .then((res) => this.setState({
                            //tasks
            //            }))
            //console.log('step 1') 
             
            document.getElementById('textbox').value = '';
           
            
        }
        //console.log('step 2')
        
        
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
        this.getTasks()
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
        this.getTasks()
    }



    componentDidMount(){
        this.getTasks()
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
                        onKeyDown = {this.getInput}
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
            <TextBox getInput={this.getInput}/>
            
               {parsedTasks} 
            
            
        </div>
        )
    }
    

    
}

export default ListContainer;