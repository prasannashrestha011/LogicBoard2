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
  
    const outputValue=calculateOutput(gate.type,updatedInputPorts)
    const updatedOutputPort={...gate.output,value:outputValue}
  
    connections.forEach(conn=>{
        if(conn.start.id==gate.output.id){
            const targetedGate=gates.find(g=>(
                g.inputs.some(p=>p.id==conn.end.id)
            ))
            if(targetedGate){
                targetedGate.inputs=targetedGate.inputs.map((p)=>(
                    p.id==conn.end.id?{...p,value:outputValue}:p
                ))
                targetedGate.output.value=calculateOutput(targetedGate.type,targetedGate.inputs)
            }
        }
    })
   return {
    ...gate,
    inputs: updatedInputPorts,
    output:updatedOutputPort
    
   }
}