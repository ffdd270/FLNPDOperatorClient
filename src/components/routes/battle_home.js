import React from 'react';
import SimplePaper from '../ui/character_card_form'
import socketio from "socket.io-client";

class BattleHome extends React.Component
{
    state = {
        characters : ''
    };


    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind( this );
    }


    componentDidMount() {
        const socket = socketio.connect('http://localhost:3000');
        (() => {
            socket.emit('init', { name: 'bella' });

            socket.on('welcome', (msg) =>
            {
                console.log(msg);

                //socket.emit('')
            });
        })();
    }


    async callGetCharacter( id )
    {
        const response = await fetch("/api/get_character/" + id);
        const body = await response.json();

        return body;
    }

    render()
    {




        return (
            <div>
                <SimplePaper/>
            </div>
        )
    }


}

export default BattleHome;