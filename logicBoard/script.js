
let scale=1
 let canvas=null
 let ctx=null

 let gates=[]
 let originalGates=[]
 let ports=[]
 let connections=[]
 let type=""
 
 let selectedGate=null
 let selectedPort=null
 
 let isDragging=false
 let isDraggingPortNode=false // @@ for dragging the outer area of node only @@
 let wasDragging=false
 let isDrawing=false

 document.addEventListener('DOMContentLoaded',()=>{
   
      canvas=document.querySelector('canvas')
    const gateCmd=document.querySelectorAll('.btn')

    function toScreenCoords(x, y, scale) {
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: (x - canvas.width/2) * scale + canvas.width/2,
            y: (y - canvas.height/2) * scale + canvas.height/2
        };
    }
    
    function toWorldCoords(screenX, screenY, scale) {
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: (screenX - canvas.width/2) / scale + canvas.width/2,
            y: (screenY - canvas.height/2) / scale + canvas.height/2
        };
    }



     ctx=canvas.getContext('2d')
     DrawGatesAndPort()
   
     const handleMouseDown = (e) => {
        wasDragging = false;
    
        // Convert screen coordinates to canvas point
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
    
        // Convert screen point to world coordinates
        const worldCoords = toWorldCoords(screenX, screenY, scale);
    
        // Check for the clicked gate in world space
        const clickedGate = gates.find(gate => isPointedOnGate(gate, worldCoords));
    
        selectedGate = clickedGate;
        console.log("clicked gate", clickedGate);
    
        // Pass the world coordinates to touch start
        onTouchStart(worldCoords.x, worldCoords.y);
    };
    
    const handleMouseMove = (e) => {
        wasDragging = true;
    
        // Convert screen coordinates to canvas point
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
    
        // Convert screen point to world coordinates
        const worldCoords = toWorldCoords(screenX, screenY, scale);
    
        // Pass the world coordinates to touch move
        onTouchMove(worldCoords.x, worldCoords.y);
    };
    
    const handleMouseUp = (e) => {
        // Convert screen coordinates to canvas point
        const { x: screenX, y: screenY } = getCanvasPoint(e.clientX, e.clientY);
    
        // Convert screen point to world coordinates
        const worldCoords = toWorldCoords(screenX, screenY, scale);
    
        // Pass the world coordinates to touch end
        onTouchEnd(worldCoords.x, worldCoords.y);
    };
    

    const handleTouchStart=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        const worldCoords = toWorldCoords(x, y, scale);
        onTouchStart(worldCoords.x, worldCoords.y);
    }
    const handleTouchMove=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        const worldCoords = toWorldCoords(x, y, scale);
        onTouchMove(worldCoords.x, worldCoords.y)
    }
    const handleTouchEnd=(e)=>{
        const clientX=e.changedTouches[0].clientX
        const clientY=e.changedTouches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        const worldCoords = toWorldCoords(x, y, scale);
        onTouchEnd(worldCoords.x, worldCoords.y)
    }
    const handleClick=(e)=>{
   
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchClick(x,y)
    }
    const handleClickOnCanvasArea=(e)=>{
      
       if(wasDragging) return
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        togglePortValue({x,y})
      
    
    }
    const onTouchStart=(x,y)=>{
        isDragging=true
        console.log('\n')
        console.log("new position ",x,y)

        const clickedGate=gates.find(gate=>isPointedOnGate(gate,{x,y}))
  
        if(clickedGate){
         selectedGate=clickedGate
            return 
        }
      
        //for port dragging event 
        const clickedPortNode=ports.find(port=>isPointInPortNode({x,y},port))
        if(clickedPortNode){
            isDraggingPortNode=true
            selectedPort=clickedPortNode
        }
          // Single unified port check
        const clickedPort = findPort(x,y) || findPortOfGate(x,y) 

        if (clickedPort) {
            selectedPort = clickedPort;
            isDrawing = true;
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
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.moveTo(selectedPort.position.x, selectedPort.position.y);
        ctx.lineTo(x, y);
        ctx.stroke();
       
        }
    
       
    };
    const onTouchEnd=(x,y)=>{
        
        let targetedPort=null
         targetedPort=findPort(x,y) || findPortOfGate(x,y)
  
       
        if(selectedPort&&targetedPort){
           
            const isValidConnection=(selectedPort.id!==targetedPort.id)
            if(isValidConnection){
                let startPort=selectedPort
                let endPort=targetedPort
                if(selectedPort.type=="gate-input" && targetedPort.type=="input"){
                
                    startPort=targetedPort
                    endPort=selectedPort
                }
               
                connections.push({
                    start:startPort,
                    end:endPort,
                   
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
           console.log(zoomType)
            const zoomFactor=zoomType=="in"?(1+zoomIntensity):(1-zoomIntensity)
            scale *=zoomFactor
            scale = Math.min(Math.max(0.1, scale), 5.0);
        }
       
        DrawGatesAndPort()

       
    }
    const togglePortValue=(point)=>{
        if(isDraggingPortNode || isDragging ) return
      

         const clickedPort=findPort(point.x,point.y)
       
        
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
    
    
    gateCmd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          
            type=e.target.id
           
            handleClick(e)
        });
    });
 
   
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)
    canvas.addEventListener('mouseleave',handleMouseUp)
    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    canvas.addEventListener('touchcancel',handleTouchEnd)
    canvas.addEventListener('click',handleClickOnCanvasArea)
  
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
   // Use multiplication for smoother zooming
   const zoomIntensity = 0.1;
   const zoomFactor = e.deltaY < 0 ? (1 + zoomIntensity) : (1 - zoomIntensity);
   
   scale *= zoomFactor;
   console.log(scale)
   // Add limits to prevent extreme scaling
   scale = Math.min(Math.max(0.1, scale), 5.0);


        DrawGatesAndPort()
    });

 })