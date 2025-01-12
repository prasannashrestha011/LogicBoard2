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
const isPointInPortNode = (point, port) => {
    const { position, width, height } = port;
    if (!width || !height) return false;

    // Main rectangle boundaries
    const left = position.x - width / 2 - 42;
    const right = position.x + width / 2;
    const top = position.y - height / 2;
    const bottom = position.y + height / 2;

    // Check if the point is inside the main rectangle
    const isInsideTheRectangle = 
        point.x >= left &&
        point.x <= right &&
        point.y >= top &&
        point.y <= bottom;

    // Sub-rectangle boundaries (centered within the main rectangle)
    const subRectWidth = width / 2;
    const subRectHeight = height / 2;
    const subLeft = left + (width - subRectWidth) / 2;
    const subRight = subLeft + subRectWidth;
    const subTop = top + (height - subRectHeight) / 2;
    const subBottom = subTop + subRectHeight;

    // Check if the point is inside the sub-rectangle
    const isInsideSubRectangle = 
        point.x >= subLeft &&
        point.x <= subRight &&
        point.y >= subTop &&
        point.y <= subBottom;

    // Calculate the port distance
    const portDistance = calDistance(port, point);
    const isInPortDistance = portDistance <= port.radius;

    
    return isInsideTheRectangle && !isInsideSubRectangle && !isInPortDistance;
};
function isPointInsideSubRectangle(point,port){
    const { position, width, height } = port;
    if (!width || !height) return false;

    const XOFFSET=42
    const left = position.x - width / 2 - XOFFSET;
 
    const top = position.y - height / 2;


    const subRectWidth = width / 2;
    const subRectHeight = height / 2;
    const subLeft = left + (width - subRectWidth) / 2;
    const subRight = subLeft + subRectWidth;
    const subTop = top + (height - subRectHeight) / 2;
    const subBottom = subTop + subRectHeight;

    // Check if the point is inside the sub-rectangle
    const isInsideSubRectangle = 
        point.x >= subLeft &&
        point.x <= subRight &&
        point.y >= subTop &&
        point.y <= subBottom;
    return isInsideSubRectangle
}
 //for context menu
 function findConnection(x,y){
    let targetedConnection=null
    console.log("coordinates ",x,y)
    connections.forEach(conn => {
        const { start, end } = conn;
        
        // Distance to the line segment
        const distance = getDistanceFromLine(x, y, start.position.x, start.position.y, end.position.x, end.position.y);
    
        // Define a base threshold
        const baseThreshold = 45;
    
        // Calculate the middle of the line
        const midX = (start.position.x + end.position.x) / 2;
        const midY = (start.position.y + end.position.y) / 2;
    
        // Calculate distance to the midpoint of the line
        const distanceToMid = Math.sqrt(Math.pow(x - midX, 2) + Math.pow(y - midY, 2));
    
        // Adjust threshold: larger in the middle, smaller near the ends
        const dynamicThreshold = baseThreshold + (100 - distanceToMid); // Increasing threshold as you move toward the middle
    
        if (distance < dynamicThreshold) {
            targetedConnection = conn; // Select the connection
        }
    });
    
    
    return targetedConnection
 }
 function findGateNode(x,y){
    return gates.find(gate=>isPointedOnGate(gate,{x,y}))
 }
 function findPortNode(x,y){
    return ports.find(port=>isPointInPortNode({x,y},port))
 }
 