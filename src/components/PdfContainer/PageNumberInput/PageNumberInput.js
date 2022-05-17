import React from 'react';

const PageNumberInput = ({number, setNumber}) => (
    <div>
        <input type="number" className="page_number_input" value={number} onChange={setNumber} /> 
    </div>
)

export default PageNumberInput;