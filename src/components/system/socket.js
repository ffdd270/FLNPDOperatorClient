import socketio from "socket.io-client";
import characters from "../../test/test_datas";


export class Socket
{

    static OnSocketInit( )
    {
        if ( this.socket === undefined )
        {
            this.socket = socketio.connect('http://localhost:5000');
            this.socket.emit('init', { name: 'bella' });
        }
    }

    static AddEventHandler( event_key, event_func )
    {
        this.msgHandler.set( event_key, event_func );
        this.socket.on( event_key, event_func );
    }

    static SendMsg( event_key, event_value )
    {
        this.socket.emit(event_key, event_value);
    }


    static socket;
    static msgHandler = new Map();
}