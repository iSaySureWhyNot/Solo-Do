import React from 'react';


function getInput(e) {
    if (e.key === 'Enter'){
        const input = document.getElementById('textbox').value;
        console.log(input)
        
        document.getElementById('textbox').value = '';
    }
    
}

const TextBox = (props) => {
    return(
        <div>
            <input 
                type="text" 
                id="textbox" 
                name="fname" 
                onKeyDown = {getInput}
                >
            </input>
        </div>
        
    )
}

export default TextBox;