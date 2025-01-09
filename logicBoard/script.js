

 let canvas=null
 let ctx=null

 let gates=[]
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


     ctx=canvas.getContext('2d')
     DrawGatesAndPort()
   
    const handleMouseDown=(e)=>{
        wasDragging=false
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchStart(x,y)
    }
    const handleMouseMove=(e)=>{
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
        wasDragging=true
        onTouchMove(x,y)
    }
    const handleMouseUp=(e)=>{
      
        const {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchEnd(x,y)
    }

    const handleTouchStart=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchStart(x,y)
    }
    const handleTouchMove=(e)=>{
        const clientX=e.touches[0].clientX
        const clientY=e.touches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchMove(x,y)
    }
    const handleTouchEnd=(e)=>{
        const clientX=e.changedTouches[0].clientX
        const clientY=e.changedTouches[0].clientY
        const {x,y}=getCanvasPoint(clientX,clientY)
        onTouchEnd(x,y)
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
const clickedPort = findPort(x,y) || findPortOfGate(x,y);
console.log("CLICKED POrt",clickedPort)
if (clickedPort) {
    selectedPort = clickedPort;
    isDrawing = true;
}
      
        
    }
    const onTouchMove = (x, y) => {

        if(!isDragging) return
        if(selectedGate){
            console.log("in the para")
            const updatedGate=updateGatePosition(selectedGate,{x,y})
        
            const gateIdx=gates.findIndex(gate=>gate.id==updatedGate.id)
            if(gateIdx==-1){
                console.log("invalid idx")
                return
            }
            gates[gateIdx]=updatedGate
            console.log(updatedGate)
            connections=updateGateConnectionsPosition(connections,updatedGate)
            console.log("updated connection ",connections)
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
        console.log(isDrawing)
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
  
        console.log("selected port ",selectedPort)
            console.log("targeted port ",targetedPort)
        if(selectedPort&&targetedPort){
          
            const isValidConnection=(selectedPort.id!==targetedPort.id)
            if(isValidConnection){
                connections.push({
                    start:selectedPort,
                    end:targetedPort
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
        DrawGatesAndPort()
        
        isDrawing=false
       isDragging=false
       isDraggingPortNode=false
       selectedGate=null
        selectedPort=null
        console.log("your conenctions",connections)
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
       
        DrawGatesAndPort()

       
    }
    const togglePortValue=(point)=>{
        if(isDraggingPortNode || isDragging ) return
      

         const clickedPort=findPort(point.x,point.y)
       
         console.log("your clicked port is here for toggle",clickedPort)
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
            console.log(type)
            handleClick(e)
        });
    });
    
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    canvas.addEventListener('click',handleClickOnCanvasArea)
   

 })