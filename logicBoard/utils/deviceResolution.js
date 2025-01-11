let deviceWidth=null 
let deviceHeight=null
window.addEventListener('DOMContentLoaded',()=>{
 
const canvas=document.querySelector('canvas')
const handleWindowResize=()=>{

    const canvasContainer=document.querySelector('.canvas-container')
    const rect = canvasContainer.getBoundingClientRect();
    canvas.width=rect.width;
    canvas.height=rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gates=[]
    ports=[]
    connections=[]
 }
    
 handleWindowResize()
 window.addEventListener('resize', handleWindowResize);
  
})
