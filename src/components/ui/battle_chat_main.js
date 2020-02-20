import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, Paper, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Socket} from "../system/socket";

const styles = (theme) =>(
    {
        '*': {
            margin: 0,
            padding: 0,
            'box-sizing': 'border-box'
        },
        root: {
            position: 'fixed',
            top: 0,
            right: 0,
        },
        box: {
            width: 500,
            height: "100vh",
        },
        header_background: {
            background: '#364fc7',
            height: '2.8rem'
        },
        header: {
            position: 'relative',
            top: 5,
            left: 20,
            fontSize: '2.0rem',
            color: 'white'
        },

        input_box: {
            position: 'fixed',
            bottom: '60px',
            width: 400,
            height: 20,
        },

        input_text_field: {
            position: 'relative',
            left: 10,
            top: 30,
            width: 400,
        },

        input_button: {
            position: 'relative',
            left: 420,
            width: 50
        }
    }
);

class BattleChat extends React.Component
{
    state = {
        chat_msgs: [],
        chat_msg: ''
    };


    constructor(props)
    {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChatTextChange = this.onChatTextChange.bind(this);
        this.onTextFieldKeyDown = this.onTextFieldKeyDown.bind(this);
        this.sendMsgToServer  = this.sendMsgToServer.bind(this);

    }

    componentDidMount() {
        Socket.AddEventHandler('chat_income',( msg ) =>
        {
            let chat_msgs = this.state.chat_msgs;
            chat_msgs.push( msg );

            console.log("msg? " + msg);

            this.setState(
                {
                    chat_msgs: chat_msgs
                }
            )
        });
    }

    onChatTextChange( event )
    {
        this.setState({
                chat_msg: event.target.value
            }
        )
    }

    onTextFieldKeyDown( event )
    {
        if( event.keyCode === 13 )
        {
            this.sendMsgToServer( event );
        }
    }

    sendMsgToServer( event )
    {
        if ( this.state.chat_msg.length === 0)
        {
            return;
        }

        Socket.SendMsg( "chat", this.state.chat_msg );

        this.setState( {
            chat_msg: ''
        });
    }

    render() {

        const { classes } = this.props;

        const position_x = this.props.position_x === undefined ? 0 : this.props.position_x;
        const name = this.props.name === undefined ? 'Battle Chat!' : this.props.name;

        return (
            <div className={classes.root} style={
                {
                    top: 0,
                    right: position_x
                }
            }>
                <div/>
                <Paper elevation={3} className={classes.box}>

                    <div className={classes.header_background}>
                        <Typography variant="h1" className={classes.header}>
                            {name}
                        </Typography>
                    </div>


                    <div className={classes.input_box}>
                        <TextField
                            className={classes.input_text_field}
                            type={"text"}
                            name={"chat"}
                            value={this.state.chat_msg}
                            placeholder={"Please Enter ME!"}
                            onChange={this.onChatTextChange}
                            onKeyDown={this.onTextFieldKeyDown}
                        >
                        </TextField>

                        <Button variant="contained" color="primary" className={classes.input_button} onClick={this.sendMsgToServer}>
                            SEND
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)( BattleChat );