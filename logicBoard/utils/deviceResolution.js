let deviceWidth=null 
let deviceHeight=null
window.addEventListener('DOMContentLoaded',()=>{
 
const canvas=document.querySelector('canvas')
const handleWindowResize=()=>{
    deviceWidth=window.innerWidth *0.9 
    deviceHeight=window.innerHeight *0.8
    canvas.width=deviceWidth
    canvas.height=deviceHeight
 }
    
 handleWindowResize()
 window.addEventListener('resize', handleWindowResize);
})
