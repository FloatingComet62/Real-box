class ground
{
    constructor( x , y , width , height , s )
{
        var option=
        {
            isStatic : s ,
        }

        this.ground = Bodies.rectangle( x , y , width , height , option );
        this.width = width;
        this.height = height;
        World.add( world , this.ground );
    }
    display( color )
    {
        var pos = this.ground.position
        rectMode( CENTER );
        fill( color );
        rect( pos.x , pos.y , this.width , this.height );
    }
}