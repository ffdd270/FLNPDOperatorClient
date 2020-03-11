import React from 'react';

import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ListItemSecondaryAction} from "@material-ui/core";
import Button from "@material-ui/core/Button";


class BattleList extends React.Component
{
    state = {
        battles: null
    };

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind( this );
        this.onSelectBattle = this.onSelectBattle.bind( this );

    }


    async callApi()
    {
        const response = await fetch( "api/get_battles");
        return await response.json();
    }

    componentDidMount()
    {
        this.state.open = true;

        this.callApi().then(
            res =>
            {
                this.setState( { battles: res } );
            }
        )
    }

    onSelectBattle( event, battle_id )
    {
        console.log( battle_id );

        this.props.onSelectBattle( battle_id );
        this.close();
    }

    close()
    {
        this.setState({
            open: false
        })
    }


    onClose()
    {

    }


    render() {


        return (
            <div>
                <Dialog open={this.state.open} onClose={this.onClose}>
                    <DialogTitle> 방 목록 </DialogTitle>
                    <DialogContent>
                        <List>
                            {
                                this.state.battles != null ? this.state.battles.map( battle =>{
                                    return (
                                        <ListItem>
                                            <ListItemText primary={battle.id}/>
                                            <Button variant="contained" color="primary" onClick={event => { this.onSelectBattle( event, battle.id ) }}>
                                                접속
                                            </Button>
                                        </ListItem>
                                    );
                                } ) : ''
                            }
                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default BattleList;