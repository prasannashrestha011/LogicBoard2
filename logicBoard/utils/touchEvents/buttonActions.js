
const handleContextMenuAction=(option)=>{
  
    if(!targetedObject || !option) return 
  
    if(gates.includes(targetedObject)){
       const targetedIdx=gates.indexOf(targetedObject)
       if(targetedIdx==-1) return 
       gates.splice(targetedIdx,1)
       
       //@@ removes the connection if user delete the connected gates
       connections = connections.filter(conn => 
        !targetedObject.inputs.some(port => 
            conn.start.id === port.id || conn.end.id === port.id
        )
       
    );
    

    }
    if(connections.includes(targetedObject)){
        const targetedIdx=connections.indexOf(targetedObject)
        if(targetedIdx==-1) return 
        connections.splice(targetedIdx,1)
    }
    if(ports.includes(targetedObject)){
        const targetedIdx=ports.indexOf(targetedObject)
        if(targetedIdx==-1) return 
        ports.splice(targetedIdx,1)
        connections=connections.filter(conn=>(
            !(conn.start.id==targetedObject.id || conn.end.id==targetedObject.id)
        ))
    }
    contextMenu.style.display = 'none';
    targetedObject=null
    DrawGatesAndPort()
}
const handleContextMenu = (e) => {
    const {x, y} = getCanvasPoint(e.clientX, e.clientY);
   
    console.log("context menu running")
     targetedObject = findConnection(x, y) || findGateNode(x, y) || findPortNode(x, y);

};