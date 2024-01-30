import React from 'react';
import "./index.css"

const EditInput = ({title, name, typeOfInput, editServerName}) => {
    return (
        <div className={"editInput"}>
            <span>{title}</span>
            <input type={typeOfInput} defaultValue={name} onChange={(e) => editServerName(e.target.value)}/>
        </div>
    );
};

export default EditInput;