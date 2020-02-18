import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Card, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        }
    }
);

class BattleChat extends React.Component
{
    state = {
        styles
    };


    constructor(props)
    {
        super(props);
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
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)( BattleChat );