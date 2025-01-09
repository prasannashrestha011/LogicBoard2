function isPointedOnGate(gate,point){
    const {position,width,height}=gate
    const left = position.x - width/2;
    const right = position.x + width/2;
    const top = position.y - height/2;
    const bottom = position.y + height/2;
    
    // Check if point is within boundaries
    return (
        point.x >= left &&
        point.x <= right &&
        point.y >= top &&
        point.y <= bottom
    );
}
const isPointInPortNode=(point,port)=>{

    const {position,width,height}=port
    if(!width || !height) return false
    const left = position.x - width/2;
    const right = position.x + width/2;
    const top = position.y - height/2;
    const bottom = position.y + height/2;

    const isInsideTheRectangle=point.x >= left &&
    point.x <= right &&
    point.y >= top &&
    point.y <= bottom;

    const portDistance=calDistance(port,point)
    const isInPortDistance=portDistance<=port.radius;

    return isInsideTheRectangle && !isInPortDistance

 }