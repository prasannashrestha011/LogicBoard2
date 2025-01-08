function updatePortValues(gate,clickedPort,newValue){
    let hasConnection=false
    const updatedInputPorts=gate.inputs.map(port=>{
        const isConnected=connections.some(conn=>conn.start.id===clickedPort.id && conn.end.id===port.id)
        if(isConnected){
            hasConnection=true
            return {...port,value:newValue}
        }else{
            return port
        }
    })
    if(!hasConnection){
       
        return gate 
    }
    console.log(gate)
    const outputValue=calculateOutput(gate.type,updatedInputPorts)
    const updatedOutputPort={...gate.output,value:outputValue}
    console.log("bugged output ",updatedOutputPort.value)
    console.log(connections)
   return {
    ...gate,
    inputs: updatedInputPorts,
    output:updatedOutputPort
    
   }
}