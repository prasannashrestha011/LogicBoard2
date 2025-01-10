function updatePortValues(gate, clickedPort, newValue) {
    let hasConnection = false;

    const updatedInputPorts = gate.inputs.map(port => {
        const isConnected = connections.some(conn => conn.start.id === clickedPort.id && conn.end.id === port.id);
        if (isConnected) {
            hasConnection = true;
            return { ...port, value: newValue };
        } else {
            return port;
        }
    });

    if (!hasConnection) {
        return gate; // No update needed if there's no connection.
    }

    const outputValue = calculateOutput(gate.type, updatedInputPorts);
    const updatedOutputPort = { ...gate.output, value: outputValue };

   
    // Start propagation from the current gate.
    propagateUpdates(outputValue, gate.output.id);

    return {
        ...gate,
        inputs: updatedInputPorts,
        output: updatedOutputPort,
    };
}
 // Recursive function to propagate updates.
 function propagateUpdates(outputValue, outputId, visited = new Set()) {
    if (visited.has(outputId)) return; 

    visited.add(outputId);

    connections.forEach(conn => {
        if (conn.start.id === outputId) {
            const targetedGate = gates.find(g => g.inputs.some(p => p.id === conn.end.id));
            if (targetedGate) {
                const updatedInputs = targetedGate.inputs.map(p =>
                    p.id === conn.end.id ? { ...p, value: outputValue } : p
                );
                const newOutputValue = calculateOutput(targetedGate.type, updatedInputs);

                // Recursively update downstream gates.
                propagateUpdates(newOutputValue, targetedGate.output.id, visited);

                // Update the targeted gate.
                targetedGate.inputs = updatedInputs;
                targetedGate.output.value = newOutputValue;
            }
        }
    });
}
