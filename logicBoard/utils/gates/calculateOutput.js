const calculateOutput = (gateType, inputs) => {
  
    const inputValues = inputs.map(port => port.value);
    console.log("Your input values ",inputValues)
    console.log("your gate types ",gateType)
    const hasNullInput = inputValues.some(input => input == null);

    if (hasNullInput) {
        return null;  // Return null if any input is not defined
    }
    switch (gateType) {
      case 'and':
        return inputValues.every(Boolean);
    
      case 'or':
        
          console.log("OR gate inputs:", inputValues);
          return inputValues[0] || inputValues[1];
    

      
       case 'not':
     
          console.log("not condition")
          console.log(!inputValues)
          return !inputValues[0]
      
      case 'nand':
      
          return !(inputValues[0] && inputValues[1])
 
      case 'nor':
       
          return !(inputValues[0] || inputValues[1])
  
      case 'xor':
        
          return (inputValues[0] && !inputValues[1]) || (!inputValues[0] && inputValues[1])

     
      default:
        return null;
    }
  };