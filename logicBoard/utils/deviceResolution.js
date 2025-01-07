let deviceWidth=null 
let deviceHeight=null
window.addEventListener('DOMContentLoaded',()=>{
 
const canvas=document.querySelector('canvas')
const handleWindowResize=()=>{
    deviceWidth=window.innerWidth *0.9 
    deviceHeight=window.innerHeight *0.8
    canvas.width=deviceWidth
    canvas.height=deviceHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gates=[]
    ports=[]
    connections=[]
 }
    
 handleWindowResize()
 window.addEventListener('resize', handleWindowResize);
  
})
