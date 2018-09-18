import React from "react";
import { connect } from "react-redux";
import Message from "./Message"

const Messages = (props) => (
    props.messages.length > 0 && (
        <div className="messages">
            {props.messages.reverse().map(message => <Message key={message.id} {...message} />)}
        </div>
    )
)

const mapStateToProps = (state) => ({
    messages: state.messages
});

export default connect(mapStateToProps)(Messages);
