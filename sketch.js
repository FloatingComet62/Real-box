//-----------------------------------------------------------------------------------------------------//
log( "log" , "Variables & Constants Creating" );
//--------------------------------------------------//
{
var Engine = Matter.Engine;
var World= Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
}
//--------------------------------------------------//
{
var sensivity = 100;
var Esensivity = 100;
var vis = 0;
var state = -1;
var health = 1000;
var engine, world;
var Ebox , box11 , box22;
var menu1 , menu2;
var ground1 , ground2, ground3 , ground4;
var healthBarYour , healthYour , healthBarEnemy , healthEnemy , healthBar2 , health2; 
var cooldown , health_decrease_sp ;
var rand;
var num_deaths , num_wins ;
var game , gameState ;
var boxes = [];
var menudis;
var playerCount=0;
var player;
var minusone , zero , one , two;
}
//--------------------------------------------------//
log( "log" , "Variables & Constants Created" );
//-----------------------------------------------------------------------------------------------------//
log( "log" , "Setting Up" );
//--------------------------------------------------//
function setup()
{
    //--------------------------------------------------//
    //engine creation 
    createCanvas( 1366 , 764 );
    engine = Engine.create();
    world = engine.world;
    //--------------------------------------------------//
    {
    //players
    //Ebox = new Box( 400 , 400 , 100 , 100 , 1.2 , 0 , 0 , 2.0 , 1000 , true );//boss enemy
    //box11 = new Box( 400 , 300 , 100 , 100 , 1.2 , 0 , 0 , 2.0 , 1000 , true );//boss you
    //box22 = new Box( 400 , 300 , 100 , 100 , 1.2 , 0 , 0 , 2.0 , 1000 , true );//boss other players
    Ebox = new Box( -1000 , -1000 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//enemy
    box11 = new Box( -1000 , -1000 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//you
    box22 = new Box( -1000 , -1000 , 50 , 50 , 1.2 , 0 , 0 , 2.0 , 100 , false );//other
    menu1 = new Box( 500 , 100 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 1
    menu2 = new Box( 500 , 300 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 2
    }
    //--------------------------------------------------//
    //boader
    {
    ground1 = new ground( 500 , 1110 , 1900 , 800 , true );//bottom
    ground2 = new ground( 500 , -260 , 1900 , 600  , true );//top
    ground3 = new ground( -460 , 500 , 1000 , 1000 , true );//left
    ground4 = new ground( 1400 , 500 , 150 , 1000 , true );//right
    }
    //--------------------------------------------------//
    //valuing
    {
    healthYour = health;
    healthEnemy = health;
    health2 = health;
    sensivity = 100;
    Esensivity = 100;
    cooldown = 0;
    health_decrease_sp = 10; 
    rand = Math.round( random( 10 , 1300 ) );
    deathcounter=1;
    wincounter=1;
    num_deaths = 0;
    num_wins = 0;
    win_rate = (num_wins/num_deaths)*100;
    minusone = 0;
    zero = 0;
    one = 0;
    two = 0;
    }
    //--------------------------------------------------//
    //top bars
    {
    healthBarYour = new ground( 200 , 20 , healthYour/10 , 10 , true );
    healthBarEnemy = new ground( 1150 , 20 , healthEnemy/10 , 10 , true );
    healthBar2 = new ground( 9999 , 99 , health2/10 , 10 , true );
    }
    //--------------------------------------------------//
    //multiplayer
    {
    database = firebase.database();
    menudis = new element();
    }
    //--------------------------------------------------//
}
//--------------------------------------------------//
log( "log" , "Setup Done" );
//-----------------------------------------------------------------------------------------------------//
function draw()
{
    //canvas and engine
    needs( 0 );
    menudis.fore();
    menudis.multiplayer.hide();
    //--------------------------------------------------//
    /*
    When state is -1, Menu is shown.
    When state is 0, Game is paused.
    When state is 1, the singleplayer is in action.
    When state is 2, multiplayer is in action.
    */
    //what , when
    {

    if( state===-1 )
    {
        minusone++;
        zero = 0;
        one = 0;
        two = 0;
        if(minusone===1)
        {
            console.log( -1 );

            Body.setPosition( box11.body , { x : -1000 , y : -1000 } );
            Body.setPosition( Ebox.body , { x : -1000 , y : -1000 } );
            Body.setStatic( box11.body , true );
            Body.setStatic( Ebox.body , true );
            menu1 = undefined;
            menu2 = undefined;
            menu1 = new Box( 1250 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 1
            menu2 = new Box( 100 , 140 , 50 , 50 , 1.2 , 0 , 0 , 1.0 , 100 , false );//menu bot 2
        }
        menu();
        if( menu1!=undefined && menu2!=undefined )
        {
                Body.applyForce( menu1.body , menu1.body.position ,
            {
                x: menu1.body.density*Math.round( random( -Esensivity , Esensivity ) ) ,
                y: menu1.body.density*Math.round( random( -Esensivity , Esensivity ) )
            }
            );
        Body.applyForce( menu2.body , menu2.body.position ,
            {
                x: menu2.body.density*Math.round( random( -Esensivity , Esensivity ) ) ,
                y: menu2.body.density*Math.round( random( -Esensivity , Esensivity ) )
            }
            );
        }
    }

    if( state===0 )
    {
        menudis.cancel.hide();
        minusone = 0;
        zero++;
        one = 0;
        two = 0;
        if(zero===1)
        {
            console.log( 0 );
        }
        write();
    }

    if( state===1 )
    {
        minusone = 0;
        zero = 0;
        one++;
        two = 0;
        if(one===1)
        {
            console.log( 1 );
        }
        write();
        fightBack();
    }
    if( state===2 )
    {
        minusone = 0;
        zero = 0;
        one = 0;
        two++;
        if(two===1)
        {
            console.log( 2 );
        }
        writeMULTI();
    }

    hitingGround();
    }
    //--------------------------------------------------//
    //value changing
    {
    cooldown++;
    vis = vis + 5;
    rand = Math.round( random( 10 , 1300 ) );
    if( num_deaths+num_wins===0 )
    {
        win_rate = Math.round((num_wins/(1))*100);
    }else
    {
        win_rate = Math.round((num_wins/(num_deaths+num_wins))*100);
    }
    }
}
//-----------------------------------------------------------------------------------------------------//
function keyPressed()
{
    //--------------------------------------------------//
    //movements    
    if( keyCode===UP_ARROW || keyCode===87 )
    {
		Body.applyForce(box11.body,box11.body.position,
            {
                x: box11.body.density*0 ,
                y: box11.body.density*-sensivity
            }
            );
    }

    if( keyCode===DOWN_ARROW || keyCode===83 )
    {
		Body.applyForce(box11.body,box11.body.position,
            {
                x: box11.body.density*0 ,
                y: box11.body.density*sensivity
            }
            );
    }

    if( keyCode===LEFT_ARROW || keyCode===65 )
    {
		Body.applyForce(box11.body,box11.body.position,
            {
                x: box11.body.density*-sensivity ,
                y: box11.body.density*0
            }
            );
    }

    if( keyCode===RIGHT_ARROW || keyCode===68 )
    {
		Body.applyForce(box11.body,box11.body.position,
            {
                x: box11.body.density*sensivity ,
                y: box11.body.density*0
            }
            );
    }
    //--------------------------------------------------//
    //pause and resume keys
    if( keyCode===82 )
    {
        Body.setStatic( Ebox.body , false );
        Body.setStatic( box11.body , false );
        state = 1;
    }
    if( keyCode===80 )
    {
        Body.setStatic( Ebox.body , true );
        Body.setStatic( box11.body , true );
        state = 0;
    }
    //--------------------------------------------------//
}
//-----------------------------------------------------------------------------------------------------//
