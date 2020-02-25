export class ChatLog
{
    sender;
    massages;

    constructor( sender, msg ) {
        this.sender = sender;
        this.massages = [ msg ];
    }

    addMassage( msg )
    {
        this.massages.push( msg  );
    }
}
