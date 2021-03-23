//-----------------------------------------------------------------------------------------------------//
//quick console
function log( type , message )
{
    var VAl = type.toLowerCase();
    switch (VAl) {
        case "log":
            console.log( message );
            break;

        case "warn":
            console.warn( message );
            break;

        case "error":
            console.error( message );
            break;

        default:
            console.error( "message 'function' has invaid first value, the possible values are 'log', 'warn' & 'error'." );
    }
}
//-----------------------------------------------------------------------------------------------------//
//quick dialog
function dialog( type , message )
{
    var VAl = type.toLowerCase();
    switch (type) {
        case "alert":   
            alert( message );
            break;

        case "confirm":
            confirm( message );
            break;
    
        default:
            console.error( "message 'dialog' has invaid first value, the possible values are 'alert' & 'confirm'." );
            break;
    }
}
//-----------------------------------------------------------------------------------------------------//
//quick text maker
function TEXT( Text , x , y , size , color )
{
    push();
    fill( color );
    textSize( size );
    text( Text , x , y );
    pop();
}
//-----------------------------------------------------------------------------------------------------//
function needs( color )
{
    if( frameCount===1 )
    {
        console.log( "Starting up the loop" );
    }
    background( color );
    Engine.update( engine );
    display();
    healthreduction();
    healthupdation();
    death();
}
//-----------------------------------------------------------------------------------------------------//
//object displaying
function display()
{
Ebox.display( "red" );
box11.display( "blue" );
box22.display( "blue" );
if( menu1!=undefined && menu2!=undefined )
{
    menu1.display("blue");
    menu2.display("red");
}
ground1.display("brown");
ground2.display("brown");
ground3.display("brown");
ground4.display("brown");
healthBarYour.display("blue");
healthBarEnemy.display("red");
}
//-----------------------------------------------------------------------------------------------------//
//health reduction performer
function healthreduction()
{
    if( box11.body.position.x - (box11.width/2) > Ebox.body.position.x + (Ebox.width/2) || box11.body.position.x + (box11.width/2) < Ebox.body.position.x - (Ebox.width/2) || box11.body.position.y - (box11.height/2) > Ebox.body.position.y + (Ebox.height/2) || box11.body.position.y + (box11.height/2) < Ebox.body.position.y - (Ebox.height/2) )
    {
        
    }else
    {
        if( cooldown>5 )
        {
            if( box11.body.speed > Ebox.body.speed )
            {
                healthEnemy = healthEnemy - (health_decrease_sp*( box11.body.speed - Ebox.body.speed ))/Ebox.body.density;
                cooldown = 0;
            }
            if( box11.body.speed < Ebox.body.speed )
            {
                healthYour = healthYour - (health_decrease_sp*( Ebox.body.speed - box11.body.speed ))/box11.body.density;
                cooldown = 0;
            }
        }
    }
}
//-----------------------------------------------------------------------------------------------------//
//bar updater
function healthupdation()
{
    if( healthEnemy > 0 )
    {

        healthBarEnemy.width = healthEnemy/10;
    }
    if( healthYour > 0 )
    {
        healthBarYour.width = healthYour/10;
    }
    if( healthEnemy < 0 )
    {
        healthEnemy = 0;
        healthBarEnemy.width = healthEnemy/10;
    }
    if( healthYour < 0 )
    {
        healthYour = 0;
        healthBarYour.width = healthYour/10;
    }
}
//-----------------------------------------------------------------------------------------------------//
//death controller
function death()
{
        if( healthYour === 0 )
        {
            Body.setPosition( box11.body , { x : -1000 , y : -1000 } );
            Body.setPosition( Ebox.body , { x : -1000 , y : -1000 } );
            Body.setStatic( box11.body , true );
            Body.setStatic( Ebox.body , true );

            push();
            fill( "white" );
            textSize( 20 );
            text( "You died" , 600 , 700 );

            if( deathcounter === 1 )
            {
                num_deaths++;
                deathcounter++;
            }

            pop();

            menu1 = undefined;
            menu2 = undefined;
            menu1 = new Box( 1250 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 1
            menu2 = new Box( 100 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 2

            state=-1;
        }
        if( healthEnemy === 0 )
        {
            Body.setPosition( box11.body , { x : -1000 , y : -1000 } );
            Body.setPosition( Ebox.body , { x : -1000 , y : -1000 } );
            Body.setStatic( box11.body , true );
            Body.setStatic( Ebox.body , true );

            push();
            fill( "white" );
            textSize( 20 );
            text( "Enemy died" , 600 , 700 );

            if( wincounter === 1 )
            {
                num_wins++;
                wincounter++;
            }

            pop();

            menu1 = undefined;
            menu2 = undefined;
            menu1 = new Box( 1250 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 1
            menu2 = new Box( 100 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 2

            state=-1;
        }
}
//-----------------------------------------------------------------------------------------------------//
//texts which is running when rounds are going on
function write()
{
    push();
    fill( "white" );
    textSize( 20 );
    text( Math.round( healthYour ) , 200 , 25 );
    text( Math.round( healthEnemy ) , 1150 , 25 );
    text( "Press P to pause and press R again to resume" , 450 , 25 );
    text( "Use WASD or Arrow keys for movement" , 500 , 745 );
    pop();
    
}
function writeMULTI()
{
    push();
    fill( "white" );
    textSize( 20 );
    if( playerCount<2 )
    {
        text( "Waiting for players..." + playerCount + "/2" , 550 , 300 );
    }
    text( Math.round( healthYour ) , 200 , 25 );
    text( Math.round( health2 ) , 1150 , 25 );
    pop();
}
//-----------------------------------------------------------------------------------------------------//
//enemy movements
function fightBack()
{

    Body.applyForce( Ebox.body , Ebox.body.position ,
        {
            x: Ebox.body.density*Math.round( random( -Esensivity , Esensivity ) ) ,
            y: Ebox.body.density*Math.round( random( -Esensivity , Esensivity ) )
        }
        );
}
//-----------------------------------------------------------------------------------------------------//
//bug turn feature
function hitingGround()
{
    if( healthYour>2 || healthEnemy>2 )
    {
        if( Ebox.body.position.x > 1350 || Ebox.body.position.x < 0 )
        {
            push();
            fill( "white" );
            textSize( 20 );
            text( "Enemy hit the ground to hard" , 500 , 700 );
            pop();

            state=-1;
            healthEnemy = 1;
            healthBarEnemy.width = 1;
        }
        if( Ebox.body.position.y > 757 || Ebox.body.position.y < 0 )
        {
            push();
            fill( "white" );
            textSize( 20 );
            text( "Enemy hit the ground to hard" , 500 , 700 );
            pop();

            state=-1;
            healthEnemy = 1;
            healthBarEnemy.width = 1;
        }


        if( box11.body.position.x > 1350 || box11.body.position.x < 0 )
        {
            push();
            fill( "white" );
            textSize( 20 );
            text( "hit the ground to hard" , 500 , 700 );
            pop();

            state=-1;
            healthYour = 1;
            healthBarYour.width = 1;
        }
        if( box11.body.position.y > 757 || box11.body.position.y < 0 )
        {
            push();
            fill( "white" );
            textSize( 20 );
            text( "You hit the ground to hard" , 500 , 700 );
            pop();

            state=-1;
            healthYour = 1;
            healthBarYour.width = 1;
        }
    }    
}
//-----------------------------------------------------------------------------------------------------//
//menu
function menu()
{
    push();
    fill( "white" );
    textSize( 50 );
    text( "REAL BOX" , 525 , 300 );
    pop();
    push();
    fill( "white" );
    textSize( 20 );
    text( "wins:" + num_wins , 100 , 100 );
    text( "deaths:" + num_deaths , 1150 , 100 );
    text( "win rate:" + win_rate + "%" , 575 , 100 );
    menudis.display();
    pop();
}
//-----------------------------------------------------------------------------------------------------//