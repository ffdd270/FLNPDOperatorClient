
import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => (
    {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(32),
                height: theme.spacing(16),
            },
        },
    }
);



class CharacterCardForm extends  React.Component
{
    state = {
        character : ''
    }

    constructor( props )
    {
        super(props);
    }
    render()
    {
        const { classes } = this.props;
        const character = this.props.character;

        console.log ( character );

        return (
            <div className={classes.root}>
                <Paper elevation={3}>
                    <img src={character.image}  alt="not loaded."/>
                </Paper>
            </div>
        );
    }
}


export default withStyles(styles)( CharacterCardForm );