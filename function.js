//quick console logging
function message( message )
{
    console.log( message );
}


//quick text maker
function TEXT( Text , x , y , size , color )
{
    push();
    fill( color );
    textSize( size );
    text( Text , x , y );
    pop();
}


//object displaying
function display()
{
box1.display( "red" );
box2.display( "blue" );
ground1.display("brown");
ground2.display("brown");
ground3.display("brown");
ground4.display("brown");
healthBarYour.display("blue");
healthBarEnemy.display("red");
}


//health reduction performer
function healthreduction()
{
    if( box2.body.position.x - (box2.width/2) > box1.body.position.x + (box1.width/2) || box2.body.position.x + (box2.width/2) < box1.body.position.x - (box1.width/2) || box2.body.position.y - (box2.height/2) > box1.body.position.y + (box1.height/2) || box2.body.position.y + (box2.height/2) < box1.body.position.y - (box1.height/2) )
    {
        
    }else
    {
        if( cooldown>5 )
        {
            if( box2.body.speed > box1.body.speed )
            {
                healthEnemy = healthEnemy - (health_decrease_sp*( box2.body.speed - box1.body.speed ))/box1.body.density;
                cooldown = 0;
            }
            if( box2.body.speed < box1.body.speed )
            {
                healthYour = healthYour - (health_decrease_sp*( box1.body.speed - box2.body.speed ))/box2.body.density;
                cooldown = 0;
            }
        }
    }
}


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


//death controller
function death()
{
        if( healthYour === 0 )
        {
            Body.setStatic( box2.body , true );
            Body.setPosition( box2.body , { x : 500 , y : -200 } );
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

            state=-1;
        }
        if( healthEnemy === 0 )
        {
            Body.setStatic( box1.body , true );
            Body.setPosition( box1.body , { x : 500 , y : -200 } );
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

            state=-1;
        }
}


//texts which is running when rounds are going on
function write()
{
    push();
    fill( "white" );
    textSize( 20 );
    text( Math.round(healthYour) , 200 , 25 );
    text( Math.round(healthEnemy) , 1150 , 25 );
    text( "Press P to pause and press R again to resume" , 450 , 25 );
    pop();
    
}


//enemy movements
function fightBack()
{

    Body.applyForce( box1.body , box1.body.position ,
        {
            x: box1.body.density*Math.round( random( -Esensivity , Esensivity ) ) ,
            y: box1.body.density*Math.round( random( -Esensivity , Esensivity ) )
        }
        );
}


//bug turn feature
function hitingGround()
{
    if( healthYour>2 || healthEnemy>2 )
    {
        if( box1.body.position.x > 1350 || box1.body.position.x < 0 )
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
        if( box1.body.position.y > 757 || box1.body.position.y < 0 )
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


        if( box2.body.position.x > 1350 || box2.body.position.x < 0 )
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
        if( box2.body.position.y > 757 || box2.body.position.y < 0 )
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


//menu
function menu()
{
    push();
    fill( "white" );
    textSize( 50 );
    text( "REAL BOX" , 500 , 300 );
    text( "Press Space to start playing" , 350 , 400 );
    pop();
    push();
    fill( "white" );
    textSize( 20 );
    text( "wins:" + num_wins , 100 , 100 );
    text( "deaths:" + num_deaths , 1150 , 100 )
    text( "win rate:" + win_rate , 575 , 100 );
    pop();

    if( keyCode===32 )
    {
        state=1;
        deathcounter=1;
        wincounter=1;
        Body.setStatic( box1.body , false );
        Body.setStatic( box2.body , false );
        Body.setDensity( box2.body , 1 );
        Body.setDensity( box1.body , 1 );
        Body.setInertia( box2.body , 4166666.666666667 );
        Body.setInertia( box1.body , 4166666.666666667 );
        Body.setPosition( box1.body , { x : 1310 , y : 50 } );
        Body.setPosition( box2.body , { x : 50 , y : 50 } );
        healthYour=health*box2.body.density;
        healthEnemy=health*box1.body.density;
    }
}