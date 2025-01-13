const onTouchStart=(x,y)=>{
    isDragging=true
 
    const clickedGate=findGateNode(x,y)

    if(clickedGate){
     selectedGate=clickedGate
     targetedObject=clickedGate

    }
  
    //for port dragging event 
    const clickedPortNode=findPortNode(x,y)
    if(clickedPortNode){
        isDraggingPortNode=true
        selectedPort = clickedPortNode.value == null ? { ...clickedPortNode, value: false } : clickedPortNode;

    }
      // Single unified port check
    const clickedPort = findPort(x,y) || findPortOfGate(x,y) 

    if (clickedPort) {
        selectedPort = clickedPort;
        isDrawing = true;
    }
    if(selectedPort){
        targetedObject=selectedPort
    }
   
 
    
}
const onTouchMove = (x, y) => {

    if(!isDragging) return
    
    if(selectedGate){

        const updatedGate=updateGatePosition(selectedGate,{x,y})
    
        const gateIdx=gates.findIndex(gate=>gate.id==updatedGate.id)
        if(gateIdx==-1){
       
            return
        }
        gates[gateIdx]=updatedGate

        connections=updateGateConnectionsPosition(connections,updatedGate)
    
    }
    if(selectedPort && isDraggingPortNode){
        const updatedPortNode=updatePortPosition(selectedPort,{x,y})
        const portIdx=ports.findIndex(port=>updatedPortNode.id==port.id)
        if(portIdx==-1) return 
        ports[portIdx]=updatedPortNode
        connections=updatePortConnectionPosition(connections,updatedPortNode)
    }
    DrawGatesAndPort()
    //@@ for drawing tempo lines (connectors)
    if(selectedPort && isDrawing){
        
        ctx.save()
        
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.scale(scale, scale);
        ctx.translate(-canvas.width/2 + offsetX, -canvas.height/2 + offsetY);
        
       
        ctx.beginPath()
        ctx.strokeStyle = "blue"
        ctx.lineWidth = 2/scale 
        
        
        const startX = selectedPort.position.x
        const startY = selectedPort.position.y
        
       
        ctx.moveTo(startX, startY)
        ctx.lineTo(x, y)
        ctx.stroke()
        
       
        ctx.restore()
        return 
    }
 
   
};
const onTouchEnd=(x,y)=>{
    
    let targetedPort=null
     targetedPort=findPort(x,y) || findPortOfGate(x,y)

   
    if(selectedPort&&targetedPort){
        const hasInputConnections=(   connections.some(conn=>conn.start.id===selectedPort.id || conn.end.id===selectedPort.id) ||
        connections.some(conn=>conn.start.id===targetedPort.id || conn.end.id===targetedPort.id) ) && selectedPort.type=="input"
        const isValidConnection=(selectedPort.id!==targetedPort.id) && !hasInputConnections
        
        
        if(isValidConnection){
        
            if(selectedPort.type=="gate-input" && targetedPort.type=="input"){
                // swapping the port values to align with targeted result 
                let tempPort=selectedPort

                selectedPort=targetedPort
                targetedPort=tempPort
              
            }
            console.log(targetedPort)
            connections.push({
                start:selectedPort,
                end:targetedPort,
               
            })
        
            gates=gates.map(gate=>{
                const updatedInputIdx=gate.inputs.findIndex(port=>port.id==targetedPort.id)
                if(updatedInputIdx==-1) return  gate
              
                const updatedInputs=[...gate.inputs]
                updatedInputs[updatedInputIdx]={...targetedPort,value:selectedPort.value}
                
                const updatedOutput=calculateOutput(gate.type,updatedInputs)
                const updatedOutputPort={...gate.output,value:updatedOutput}
                return {...gate,inputs:updatedInputs,output:updatedOutputPort}
            })
         
        }
       
    }
 
    isDrawing=false
   isDragging=false
   isDraggingPortNode=false
   selectedGate=null
    selectedPort=null
 

    DrawGatesAndPort()
}

const onTouchClick=(x,y)=>{

    const nodeType=type.split('-')[0]
    const position=generateRandomPosition()

    if(nodeType=="gate"){
        const gateType=type.split('-')[1]
       
        createGate(gateType,position)
       
    }
    if(nodeType=="port"){
        const portType=type.split('-')[1]
        createPort(portType,position)
    }
    if(nodeType=="zoom"){
        const zoomIntensity = 0.1;
       const zoomType=type.split('-')[1]
     
        const zoomFactor=zoomType=="in"?(1+zoomIntensity):(1-zoomIntensity)
        scale *=zoomFactor
        scale = Math.min(Math.max(0.1, scale), 5.0);
    }
   
    DrawGatesAndPort()

   
}
const togglePortValue=(point)=>{
    if(isDraggingPortNode || isDragging ) return
  
    const {x,y}=point
     const clickedPort=ports.find(port=>isPointInsideSubRectangle({x,y},port))
   
    
     if(!clickedPort) return 
     const newValue=!clickedPort.value
     ports=ports.map(port=>{
        return port.id==clickedPort.id?{...port,value:newValue}:port
     })
    
        const updatedGate=gates.map(gate=>{

           return updatePortValues(gate,clickedPort,newValue)
        })
        gates=updatedGate
      
    
     DrawGatesAndPort()
}