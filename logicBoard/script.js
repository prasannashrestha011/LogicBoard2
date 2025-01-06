 document.addEventListener('DOMContentLoaded',()=>{

    const canvas=document.querySelector('canvas')
    const gateCmd=document.querySelectorAll('.btn')

    const ports=[]
    const portProp={
        id:'',
        radius:8,
        value:false,
        position:{x:0,y:0}
    }
    let counter=0
    let deviceWidth=null
    let deviceHeight=null
    const handleWindowResize=()=>{
    deviceWidth=window.innerWidth *0.9 
     deviceHeight=window.innerHeight *0.8
    canvas.width=deviceWidth
    canvas.height=deviceHeight
    }
    handleWindowResize()
    let isDrawing=false 
    const ctx=canvas.getContext('2d')
   
    const getCanvasPoint=(clientX,clientY)=>{
        const rect=canvas.getBoundingClientRect()
        const scaleX=canvas.width/rect.width
        const scaleY=canvas.height/rect.height
        return {
            x:(clientX-rect.left)*scaleX,
            y:(clientY-rect.top) *scaleY
        }
    }
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
    
    const onTouchStart=(x,y)=>{
        const point={x,y}
        const clickedPort=ports.find(port=>{
            const distance=calDistance(port,point)
           
            console.log(distance)
            return distance<=port.radius
        })
             console.log("Your cliekced port",clickedPort)
        console.log(ports)
    }
    const onTouchMove=(x,y)=>{

    }
    const onTouchEnd=(x,y)=>{

    }
    const calDistance=(port,point)=>{
        console.log(port.position)
        const distance= Math.sqrt(Math.pow(port.position.x-point.x,2)+Math.pow(port.position.y-point.y,2))
        return distance
    }

    const drawRectange=()=>{
        ports.forEach(port=>{
            ctx.beginPath()
            ctx.fillStyle="blue"
            ctx.arc(port.position.x,port.position.y,port.radius,0,Math.PI*2)
            ctx.fill()
        })
        
      
     
    }
    const generateRandomPosition = () => {
        const positionX = Math.floor(Math.random() * deviceWidth);  // Random X position within the canvas width
        const positionY = Math.floor(Math.random() * deviceHeight); // Random Y position within the canvas height
        return { x: positionX, y: positionY };
    };
   
    const handlePortcreate=()=>{
        const id=`port-${counter++}`
        const position=generateRandomPosition()
    
        const newPort={
            ...portProp,
            id,
            position
        }

        ports.push(newPort)
        
    }
    gateCmd.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.id);
            handlePortcreate()
            drawRectange()
           
        });
    });
    
    canvas.addEventListener('mousedown',handleMouseDown)
    canvas.addEventListener('mousemove',handleMouseMove)
    canvas.addEventListener('mouseup',handleMouseUp)

    canvas.addEventListener('touchstart',handleTouchStart)
    canvas.addEventListener('touchmove',handleTouchMove)
    canvas.addEventListener('touchend',handleTouchEnd)
    window.addEventListener('resize', handleWindowResize);

 })