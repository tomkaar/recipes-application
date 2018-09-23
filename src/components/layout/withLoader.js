import React from "react";

const withLoader = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isLoading ? (
                <WrappedComponent {...props} />
            ) : (
                <h2 className="Loading">Loading..</h2>
            )}
        </div>
    );
};

export default withLoader;
