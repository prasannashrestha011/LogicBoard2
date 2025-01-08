

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
 let isDrawing=false
 document.addEventListener('DOMContentLoaded',()=>{
   
      canvas=document.querySelector('canvas')
    const gateCmd=document.querySelectorAll('.btn')


     ctx=canvas.getContext('2d')
     DrawGatesAndPort()
   
    const handleMouseDown=(e)=>{
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
        onTouchStart(x,y)
    }
    const handleMouseMove=(e)=>{
        const  {x,y}=getCanvasPoint(e.clientX,e.clientY)
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

        //for port connections ## starting point
      
        const clickedPort=findPort(x,y)
        if(!clickedPort) return 
        selectedPort=clickedPort
        isDrawing=true
        console.log("circular area ",clickedPort)
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
         targetedPort=findPort(x,y)
        gates.map(gate=>{
            const clickedPort= gate.inputs.find(port=>{
                const distance=calDistance(port,{x,y})
                return distance<=port.radius
            })
            targetedPort=clickedPort
        })
        console.log("your targeted port ",targetedPort)
        if(selectedPort&&targetedPort){
            const isValidConnection=(selectedPort.id!==targetedPort.id)
            if(isValidConnection){
                connections.push({
                    start:selectedPort,
                    end:targetedPort
                })
                console.log(connections)
             
            }
       
        }
        DrawGatesAndPort()
        
        isDrawing=false
       isDragging=false
       isDraggingPortNode=false
       selectedGate=null
        selectedPort=null
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
         const clickedPort=findPort(point.x,point.y)
         console.log("your clicked port is here for toggle",clickedPort)
         if(!clickedPort) return 
         const newValue=!clickedPort.value
         ports=ports.map(port=>{
            return port.id==clickedPort.id?{...port,value:newValue}:port
         })
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

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    canvas.addEventListener('click',handleClickOnCanvasArea)
   

 })