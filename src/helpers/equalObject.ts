export const areObjectEqual = (obj1: Record<string,string>, obj2: Record<string, string>) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Length check
    if(keys1?.length !== keys2?.length) return false; 

    // Checked Keys 
    return keys1?.every(key => obj1[key] === obj2[key] )
}