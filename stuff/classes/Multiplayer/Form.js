class Form
{

    constructor()
    {
        this.input = createInput("name");
        this.button = createButton("sign in");
        this.greetings = createElement( "h3" );
    }

    hide()
    {
        this.greetings.hide();
        this.button.hide();
        this.input.hide();
    }

    display()
    {
        
        this.title.position( 950 , (displayHeight/2)-50 );
        this.input.position( 950 , displayHeight/2 );
        this.button.position( 950 , (displayHeight/2)+50 );
        this.button.mousePressed( ()=> {

                                        this.input.hide();
                                        this.button.hide();
                                        player.name = this.input.value();
                                        playerCount++;
                                        player.index = playerCount;
                                        player.update();
                                        player.updateCount( playerCount );
                                        push();
                                        fill( "white" );
                                        this.greetings.html( "Hello, " + player.name );
                                        this.greetings.position( 140 , 150 );
                                        pop();

                                        } );
    }

}