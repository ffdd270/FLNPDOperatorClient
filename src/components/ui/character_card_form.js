
import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {Card, CardContent} from "@material-ui/core";

const styles = theme => (
    {
        root: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: '1 0 auto',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(48),
                height: theme.spacing(16),
            },
        },
        content:{
            position: 'relative',
            right: '18px',
            bottom: '16px',
        },
        name: {
            position: 'relative',
            left: '0px',
            bottom: '120px',
            paddingLeft: theme.spacing(16),
            color: 'teal',
            fontSize: '2.0rem'
        },
        hp: {
            position: 'relative',
            fontSize: '1.5rem',
            left:  theme.spacing(16),
            right: '2px',
            bottom: '120px',
        },
        image: {
            width: 128,
            height: 128,
        }
    }
);

class CharacterCardForm extends  React.Component
{
    state = {
        character : ''
    };

    constructor( props )
    {
        super(props);
    }

    render()
    {
        const { classes } = this.props;
        const character = this.props.character;

        const left = this.props.set_position;
        console.log("left??? " + left );

        return (
            <div className={classes.root} >
                <Card elevation={3} style={ {position:"relative",  left: left} }>
                    <CardContent className={classes.content}>
                        <img src={character.image}  alt="not loaded." className={classes.image}/>

                        <Typography variant="h1" className={classes.name}>
                            {character.name}
                        </Typography>

                        <Typography variant="h2" className={classes.hp}>
                            {"HP : " + character.hp}
                        </Typography>

                        <Typography variant="h2" className={classes.hp}>
                            {"AP : " + character.ap}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


export default withStyles(styles)( CharacterCardForm );