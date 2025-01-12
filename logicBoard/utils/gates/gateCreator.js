let counter=0
let width=120
let height=30
const Xoffset=40
const Yoffset=15
const outputOffset=30

//@@ for not gate offset
const notXoffset=30

const portTemplate={
    id:"",
    position:{x:0,y:0},
    value:false ,
    radius:8,
    type:"",
    width:40,
    height:60
}
const gateTemplate={
    id:"",
    type:null,
    width,
    height,
    position:{x:0,y:0},
    inputs:[portTemplate],
    output:{...portTemplate}
}
function createGate(type,position){
    const id=counter++
    if(type=="not"){
        const newGate={
            ...gateTemplate,
            id:`gate-${counter++}`,
            type,
            position,
            inputs:[
                {
                    id:`gate-input-port-${id}`,
                   ...portTemplate,
                   position:{x:position.x-notXoffset,y:position.y},
                   type:"gate-input",
                 
                }
              
            ],
            output:{
                ...portTemplate,
                id:`output-port-${id}`,
                type:"gate-output",
                position:{x:position.x+notXoffset*2+35,y:position.y},
            }
         }
        
         return
    }
     const newGate={
        ...gateTemplate,
        id:`gate-${counter++}`,
        type,
        position,
        inputs:[
            {
               ...portTemplate,
               id:`gate-input-port-${id}`,
               position:{x:position.x-Xoffset,y:position.y-Yoffset},
               type:"gate-input",
             
            },
            {
                ...portTemplate,
                id:`input-port-${id+1}`,
                position:{x:position.x-Xoffset,y:position.y+Yoffset},
                type:"gate-input"
             }
        ],
        output:{
            ...portTemplate,
            id:`output-port-${id}`,
            type:"gate-output",
            position:{x:position.x+outputOffset*2+35,y:position.y},
        }
     }
   
     gates.push(newGate)
     originalGates.push(newGate)
}
function updateGatePosition(gate, newPosition) {
  

  

    // Update input ports based on clamped position
    const updatedInputPorts = gate.inputs.map((port, idx) => {
        const portPosition = {
            x: gate.type === "not"
                ? newPosition.x - notXoffset
                : newPosition.x - Xoffset,
            y: gate.type === "not"
                ? newPosition.y
                : (idx === 0
                    ? newPosition.y - Yoffset
                    : newPosition.y + Yoffset)
        };

        return {
            ...port,
            position: portPosition
        };
    });

    // Update output port
    const updatedOutputPort = {
        ...gate.output,
        position: {
            x: newPosition.x + outputOffset * 2 + 35,
            y: newPosition.y
        }
    };

    const updatedGate = {
        ...gate,
        position: newPosition,
        inputs: updatedInputPorts,
        output: updatedOutputPort
    };

    
    return updatedGate;
}


function createPort(type,position){
    const id=counter++
    const newInputPort={
        ...portTemplate,
        id:`port-${id}`,
        position,
        type
    }
   
    ports.push(newInputPort)
}
function updatePortPosition(port,newPosition){
    if(!newPosition) return
    const updatedPort={
        ...port,
        position:newPosition
    }
    return updatedPort
}
function updateGateConnectionsPosition(connections, updatedGate) {
    return connections.map((conn) => {
        return propogateGateConnection(conn,updatedGate)
    });
}
function propogateGateConnection(conn,updatedGate){
            // Check if the connection's start matches any of the gate's input ports or output port
        const startMatch = updatedGate.inputs.find((port) => port.id === conn.start.id) || 
        (updatedGate.output.id === conn.start.id ? updatedGate.output : null);
        const endMatch = updatedGate.inputs.find((port) => port.id === conn.end.id) || 
        (updatedGate.output.id === conn.end.id ? updatedGate.output : null);

        // Update the positions if there is a match
        const updatedStartPort = startMatch ? { ...conn.start, position: startMatch.position } : conn.start;
        const updatedEndPort = endMatch ? { ...conn.end, position: endMatch.position } : conn.end;
       
        return {

        start: updatedStartPort,
        end: updatedEndPort,
       
        };
}
 function updatePortConnectionPosition(prevConnection,updatePort){
    return prevConnection.map(conn=>{
       return propogatePortConnection(conn,updatePort)
    })
}
function propogatePortConnection(conn,updatePort){
    const startMatch=conn.start.id===updatePort.id
    const endMatch=conn.end.id===updatePort.id

    const updatedStartPort=startMatch?{...conn.start,position:updatePort.position}:conn.start 
    const updatedEndPort=endMatch?{...conn.end,position:updatePort.position}:conn.end
 
    return {
       
        start:updatedStartPort,
        end:updatedEndPort,
        
    }
}