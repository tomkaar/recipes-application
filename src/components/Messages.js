import React from "react";
import { connect } from "react-redux";
import Message from "./Message"



class Messages extends React.Component {
    render() {
        return (
            this.props.message.length > 0 && (
                <div className="messages">
                    {this.props.message.map(x => <Message key={x.id} {...x} />)}
                </div>
            )
        
    )
}
}



const mapStateToProps = (state) => ({
    message: state.messages
});

export default connect(mapStateToProps)(Messages);
