class element
{

    constructor()
    {
        this.singleplayer = createButton( "Play singleplayer" );
        this.multiplayer = createButton( "Play multiplayer" );
        this.exit = createButton( "Exit" );
        this.cancel = createButton( "Cancel" );
    }

    hide()
    {
        this.singleplayer.hide();
        this.multiplayer.hide();
        this.exit.hide();
        this.cancel.hide();
    }
    show()
    {
        this.singleplayer.show();
        //this.multiplayer.show();
        this.exit.show();
        this.cancel.show();
    }
    pos()
    {
        this.singleplayer.position( 585 , 350 );
        this.multiplayer.position( 588 , 400 );
        this.exit.position( 50 , 680 );
        this.cancel.position( 50 , 680 );
    }
    press()
    {
        this.singleplayer.mousePressed( ()=> {

                                                state=1;
                                                deathcounter=1;
                                                wincounter=1;
                                                Body.setStatic( Ebox.body , false );
                                                Body.setStatic( box11.body , false );
                                                Body.setInertia( box11.body , 4166666.666666667 );
                                                Body.setInertia( Ebox.body , 4166666.666666667 );
                                                Body.setDensity( box11.body , 1 );
                                                Body.setDensity( Ebox.body , 1 );
                                                Body.setPosition( Ebox.body , { x : 1300 , y : 40 } );
                                                Body.setPosition( box11.body , { x : 60 , y : 40 } );
                                                if( menu1.body!=null && menu2.body!=null )
                                                {
                                                    World.remove( world , menu1.body );
                                                    World.remove( world , menu2.body );
                                                    menu1 = undefined;
                                                    menu2 = undefined;
                                                }
                                                healthYour=health*box11.body.density;
                                                healthEnemy=health*Ebox.body.density;
                                                menudis.hide();

                                            } );

        this.multiplayer.mousePressed( ()=> {
                                                playerCount++;
                                                this.hide();
                                                game = new Game();
                                                game.getState();
                                                game.start();
                                                state=2;
                                                deathcounter=1;
                                                wincounter=1;
                                                if( playerCount===1 )
                                                {
                                                    Body.setStatic( box11.body , false );
                                                    Body.setDensity( box11.body , 1 );
                                                    Body.setInertia( box11.body , 4166666.666666667 );
                                                    Body.setPosition( box11.body , { x : 60 , y : 40 } );
                                                }
                                                if( playerCount===2 )
                                                {
                                                    Body.setStatic( box22.body , false );
                                                    Body.setInertia( box22.body , 4166666.666666667 );
                                                    Body.setDensity( box22.body , 1 );
                                                    Body.setPosition( box22.body , { x : 1300 , y : 40 } );
                                                }
                                                if( menu1.body!=null && menu2.body!=null )
                                                {
                                                    World.remove( world , menu1.body );
                                                    World.remove( world , menu2.body );
                                                    menu1 = undefined;
                                                    menu2 = undefined;
                                                }
                                                healthYour=health*box11.body.density;
                                                healthEnemy=health*Ebox.body.density;
                                                menudis.hide();
 
                                            } );
                                            
        this.exit.mousePressed( ()=> {
                                        if( dialog( "confirm" , "are you sure?" )===true)
                                        {
                                            close();
                                        }
                                     } );

        this.cancel.mousePressed( ()=> {
                                            state = -1;
                                       } );
    }

    display()
    {
        this.singleplayer.show();
        //this.multiplayer.show();
        this.exit.show();
        this.pos();
        this.press();
    }
    fore()
    {
        if( state === -1 )
        {
            this.singleplayer.show();
            //this.multiplayer.show();
            this.exit.show();
            this.cancel.hide();
        }
        if( state === 0 )
        {
            this.singleplayer.hide();
            this.multiplayer.hide();
            this.exit.hide();
            this.cancel.hide();
        }
        if( state === 1 )
        {
            this.singleplayer.hide();
            this.multiplayer.hide();
            this.exit.hide();
            this.cancel.hide();
        }
        if( state === 2 )
        {
            this.singleplayer.hide();
            this.multiplayer.hide();
            this.exit.hide();
            this.cancel.show();
        }
    }

}