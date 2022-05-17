import React from 'react';
import './Input.css';

const Input = ({setFile, sendFile}) => (
    <div>
        <input type="file" className="input" onChange={setFile} /> 
        <button className="sendButton" onClick={sendFile}> 
            Upload! 
        </button> 
    </div>
)

export default Input;