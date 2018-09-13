import React from 'react'

const LoadingScreen = ({message = undefined}) => (
    <div>
        <h2>Loading..</h2>
        {message && <p>{message}</p>}
    </div>
);

export default  LoadingScreen;