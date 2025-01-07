 const calDistance=(port,point)=>{
    console.log(port.position)
    const distance= Math.sqrt(Math.pow(port.position.x-point.x,2)+Math.pow(port.position.y-point.y,2))
    return distance
}

