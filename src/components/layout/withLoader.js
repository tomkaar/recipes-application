import React from "react";

const WithLoader = ({isLoading, children}) => {
    return (
        <div>
            {
                isLoading ? children : <h2 className="Loading">Loading..</h2>
            }
        </div>
    );
}

export default WithLoader;
