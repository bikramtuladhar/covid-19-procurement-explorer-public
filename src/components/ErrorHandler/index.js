import React from 'react'

function ErrorHandler(props) {
    const { message } = props
    return (
        <div className="container mx-auto py-12">
            {/* <h2 className="text-2xl font-bold mb-10">Interruption occurred</h2> */}
            <p className="text-red-10">
                Sorry for inconvenience. An issue ocurred.{' '}
                <span>{message ? message : ''}</span>
            </p>
        </div>
    )
}

export default ErrorHandler
