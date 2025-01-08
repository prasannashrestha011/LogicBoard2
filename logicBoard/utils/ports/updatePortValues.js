function updatePortValues(gate,clickedPort,newValue){
    const updatedInputPorts=gate.inputs.map(port=>{
        return connections.some(conn=>conn.start.id==clickedPort.id && conn.end.id==port.id)?{
            ...port,
            value:newValue
        }:port
    })
    const outputValue=calculateOutput(gate.type,updatedInputPorts)
    const updatedOutputPort={...gate.output,value:outputValue}
   return {
    ...gate,
    inputs: updatedInputPorts,
    output:updatedOutputPort
    
   }
}