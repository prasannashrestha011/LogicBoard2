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
 //for context menu
 function findConnection(x,y){
    connections.forEach(conn => {
        const { start, end } = conn;
        const distance = getDistanceFromLine(x, y, start.position.x, start.position.y, end.position.x, end.position.y);
        const threshold = 55;
        console.log(distance)
        if (distance < threshold) {
          
            clickedConnection = conn; // Update the clickedConnection
        }
    });
 }
 function findGateNode(x,y){
    return gates.find(gate=>isPointedOnGate(gate,{x,y}))
 }
 function findPortNode(x,y){
    return ports.find(port=>isPointInPortNode({x,y},port))
 }