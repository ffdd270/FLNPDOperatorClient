
import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {Card, CardContent} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Socket} from "../system/socket";
import {Eventer} from "../system/eventer";

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
            marginLeft: '0px',
            bottom: '120px',
            paddingLeft: theme.spacing(16),
            color: 'teal',
            fontSize: '2.0rem',
            width: '100px'
        },
        hp: {
            position: 'relative',
            fontSize: '1.5rem',
            left:  theme.spacing(16),
            right: '2px',
            bottom: '120px',
            width: '100px',
        },
        image: {
            width: 128,
            height: 128,
        },
        turn_button: {
            position: "relative",
            bottom: "152px",
            left: "311px",
        }
    }
);

class CharacterCardForm extends  React.Component
{
    state = {
        character : '',
        isHaveTurn : false,
    };

    battle_id = '';

    // 대충 간단히 규격만..
    character = {
        uid: ''
    };

    constructor( props )
    {
        super(props);
        this.onTurn = this.onTurn.bind( this );
        this.onHaveTurn = this.onHaveTurn.bind( this );

        this.battle_id = props.battle_id;
        this.character = props.character;


        Eventer.AddEventHandler( "turn", (msg) =>
        {
            msg = msg === undefined ? { turn_unit_uid: -765 } :  msg;

            // uid가 같으면 턴이 온 거고. 아니면 턴이 해제 OR 없던거.
            this.onHaveTurn(msg.turn_unit_uid === this.character.uid );
        });
    }

    onTurn( )
    {
        Socket.SendMsg( "command", {
            msg: "/turn " + this.character.uid,
            battle_id : this.battle_id
        }  );
    }

    onHaveTurn( flag )
    {
        if( flag === this.state.isHaveTurn ) // 상태가 같았다면 갱신하지 않는다.
        {
            return;
        }

        this.setState( {
            isHaveTurn: flag
        });
    }

    render()
    {
        const { classes } = this.props;
        const character = this.props.character;

        let color = this.state.isHaveTurn ? "#74c0fc" : "#FFFFFF";

        return (
            <div className={classes.root} >
                <Card elevation={3} style={ {position:"relative", backgroundColor: color } }>
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
                        
                        <Button variant="contained" color="primary" className={classes.turn_button} onClick={this.onTurn} >턴</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}


export default withStyles(styles)( CharacterCardForm );