
export class Eventer
{
    static AddEventHandler( event_key, event_func )
    {
        let listeners = Eventer.event_list.get( event_key );

        if( listeners === undefined )
        {
            Eventer.event_list.set( event_key, [ ] );
            listeners = Eventer.event_list.get( event_key );
        }

        listeners.push( event_func );
    }


    static SendMsg(  event_key, event_value )
    {
        let listeners = Eventer.event_list.get( event_key );

        if( listeners === undefined )
        {
            console.log("Emety Listners");
            return;
        }

        for( let event_func of listeners )
        {
            event_func( event_value );
        }
    }


    static event_list = new Map();
}
