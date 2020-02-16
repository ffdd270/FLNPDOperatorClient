import React from 'react';
import CharacterCardForm from '../ui/character_card_form'
import socketio from "socket.io-client";
import characters from "../../test/test_datas";

class BattleHome extends React.Component
{
    state = {
        characters : []
    };


    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind( this );
    }


    componentDidMount() {
        const socket = socketio.connect('http://localhost:3000');
        (() => {
            socket.emit('init', { name: 'bella' });

            // expect characters.
            socket.on('units', async ( msg )=>
            {
                this.setState( {
                    characters : msg
                });
            });

            socket.on('added unit', async ( msg )=>
            {

                characters.push( msg );

                this.setState({
                    characters: characters
                });
            });
        })();

        this.callGetCharacter('Sample').then(
            (json)=>
            {
                this.setState( {
                    characters : json
                } );
            }
        );
    }

    async callGetCharacter( id )
    {
        const response = await fetch("/api/get_party_units/" + id);
        return await response.json();
    }

    render()
    {
        return (
            <div>
                {
                    this.state.characters ? this.state.characters.map( c =>
                    {
                        return <CharacterCardForm character={ c } />
                    }) : ''
                }
            </div>
        )
    }

}

export default BattleHome;