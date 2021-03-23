class Game
{
    constructor()
    {}

    getState()
    {
        var gameState_ref = database.ref( "gameState" );
        gameState_ref.on( "value" , function(data)
                                    {
                                        gameState = data.val();
                                    }
                                        );
    }

    update( state )
    {
        database.ref( "/" ).update( {
                                     gameState : state
                                    } 
                                        );
    }

    async start()
    {
        if(  gameState===2 )
        {
            player = new Player();
            var playerCountref = await database.ref("playerCount").once("value");
            log( "log" , playerCountref );
            if( playerCountref.exists() )
            {
                playerCount = playerCountref.val();
                player.getCount();
            }
        }
        box11 = null;
        box22 = null;
        box11 = new Box( -1000 , -1000 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//you
        box22 = new Box( -1000 , -1000 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );// other player
        boxes = [ box11 , box22 ];
    }

    play()
    {
        Player.getPlayerInfo();
        if( allplayers!== undefined )
        {
            image( trackIMG , 0 , -displayHeight*4 , displayWidth , displayHeight*5 );
            var x = 150;
            var y = 0;
            var boxIdx = 0;
            for( var plr in allplayers )
            {

                boxIdx++;
                //x = x + 200;
                boxes[ boxIdx-1 ].x =  x;
                boxes[ boxIdx-1 ].y = y;
                if( boxIdx===player.index )
                {
                    boxes[boxIdx-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                }

                if( plr==="player" + player.index )
                {
                    fill( "blue" );
                }else
                {
                    fill( "red" );
                }

            }
        }

    }

}