import React from 'react';
import './Files.css';

const Files = ({files, onClick}) => {
    
    return (
        <div>
        {files.map((file, i) => <button onClick={() => onClick(file)} key={i}>{file.filepath}</button>)}
        </div>
    )
    
}

export default Files;