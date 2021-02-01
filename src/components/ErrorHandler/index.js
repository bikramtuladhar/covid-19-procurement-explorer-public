import React from 'react'

function ErrorHandler(props){
    const {message} = props;
    return (
        <div className="py-56 container mx-auto pt-20 pb-56">
            <h2 className="text-2xl font-bold mb-10">Interruption occurred</h2>
            <p>Sorry for inconvenience. An issue occured. <span>{message ? message : ''}</span></p>
        </div>
    )
}

export default ErrorHandler