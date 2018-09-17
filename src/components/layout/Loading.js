import React from 'react'

const Loading = ({message = undefined}) => (
    <div className="Loading">
        <h2>Loading..</h2>
        {message && <p>{message}</p>}
    </div>
);

export default Loading;