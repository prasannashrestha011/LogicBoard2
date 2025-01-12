function findPort(x,y){
    let touchedPort=null
     touchedPort=ports.find(port=>{
        const distance=calDistance(port,{x,y})
        return distance<=port.radius
    })
    return touchedPort
}
function findToggledPort(x,y){
    let touchedPort=null
  
     touchedPort=ports.find(port=>{
        const toggledPort={
            ...port,
            position:{
                ...port.position,
                x:port.position.x-24
            }
        }
        const distance=calDistance(toggledPort,{x,y})
        return distance<=port.radius
    })
    return touchedPort
}
function findPortOfGate(x,y){
    for (const gate of gates) {
        // Check output port
        const outputDistance = calDistance(gate.output, { x, y });
        if (outputDistance <= gate.output.radius) {
            return gate.output;
        }
        
        // Check input ports
        for (const input of gate.inputs) {
            const inputDistance = calDistance(input, { x, y });
            if (inputDistance <= input.radius) {
                return input;
            }
        }
    }
    return null;
}
function findTportOfConn(x,y){
    let touchedConnection=null
    touchedConnection=connections.find(conn=>{
       const distance=calDistance(conn.tPort,{x,y})
       return distance<=conn.tPort.radius
   })
   return touchedConnection.tPort
}
function defTport(startPort,endPort){
    return {
        id:`${startPort.id}-${endPort.id}`,
        position:{
            x:(startPort.position.x+endPort.position.x)/2,
            y:(startPort.position.y+endPort.position.y)/2
        },
        value:startPort,
        radius:startPort.radius/1.5,
        type:"t-port"
    }
}