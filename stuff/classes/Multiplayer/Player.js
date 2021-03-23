class Player
{
    constructor()
    {
        this.index = null;
        this.x = null;
        this.y = null;
    }

    getCount()
    {
        var playerref = database.ref( "playerCount" );
        playerref.on( "value" , function( data ){
                                                    playerCount=data.val();
                                                } );
    }

    update()
    {
        var playerindex = "players/player" + this.index;
        database.ref( playerindex ).set({
                                            name : this.name ,
                                            x : this.x ,
                                            y : this.y ,
                                        } );
    }

    updateCount( count )
    {
        database.ref( "/" ).update( {
                                        playerCount : count
                                    } );
    }

    static getPlayerInfo()
    {
        var playerInforef = database.ref( "players" );
        playerInforef.on( "value" , (data)=> { allplayers = data.val(); } );
    }

}