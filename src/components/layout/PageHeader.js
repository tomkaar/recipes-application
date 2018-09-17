import React from 'react';

const PageHeader = (props) => (
    <div className="PageHeader">
        <div className="wrapper">
            <h2>{props.title}</h2>
            {props.para && <p>{props.para}</p>}
        </div>
    </div>
);

export default PageHeader;