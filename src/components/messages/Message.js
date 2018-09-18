import React from "react";
import { connect } from "react-redux";
import { removeMessage } from '../../actions/messages';

class Message extends React.Component {
    constructor(props){
        super(props);
        if(this.props.time !== 0){
            setTimeout( () => { this.handleRemove(); }, this.props.time);
        }
    }
    handleRemove = () => this.props.removeMessage(this.props.id);
    render(){
        return (
            <div className={`message is_${this.props.type}`}>
                <div className="message__content">
                    {this.props.message}
                </div>
                <div className="message_remove">
                    <button onClick={this.handleRemove}>X</button>
                </div>
                
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    removeMessage: id => dispatch(removeMessage(id))
});

export default connect(null, mapDispatchToProps)(Message);