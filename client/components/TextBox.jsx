import React from 'react';




// const getInput = async (e) => {
//     if (e.key === 'Enter'){
//         const input = await document.getElementById('textbox').value;
//         console.log(input)
//         await fetch('api/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'Application/JSON'
//             },
//             body: JSON.stringify({text:input})
//         })
//         //.then((res) => console.log(res))
//         document.getElementById('textbox').value = '';
//     }
    
// }
 
const TextBox = (props) => {
    return(
        <div className='textboxContainer'>
            <span>New Task: </span>
            <input 
                type="text" 
                id="textbox" 
                name="fname" 
                onKeyDown = {props.getInput}
                >
            </input>
            
        </div>
        
        
    )
}

export default TextBox;