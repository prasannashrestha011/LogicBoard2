 const calDistance=(port,point)=>{

    const distance= Math.sqrt(Math.pow(port.position.x-point.x,2)+Math.pow(port.position.y-point.y,2))
    return distance
}

