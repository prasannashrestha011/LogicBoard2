function findPort(x,y){
    let touchedPort=null
     touchedPort=ports.find(port=>{
        const distance=calDistance(port,{x,y})
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