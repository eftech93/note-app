type MapValueType = [string, number | undefined];

export function roughSizeOfObject(map: Map<string, MapValueType>) {

    let totalMemorySize = 0;

    // Iterate over each key-value pair in the map
    map.forEach((value, key) => {
        // Add memory size of the key (approximation based on key length and overhead)
        totalMemorySize += key.length * 2; // Assuming each character is 2 bytes (UTF-16)
        
        // Estimate memory size of the value tuple [string, number | undefined]
        totalMemorySize += 8; // Size of reference to tuple
        
        const [strValue, numValue] = value;

        // Estimate memory size of string (approximation based on string length)
        totalMemorySize += strValue.length * 2; // Assuming each character is 2 bytes (UTF-16)
        
        // Size of number (assuming a number takes 8 bytes)
        if (typeof numValue === 'number') {
            totalMemorySize += 8;
        } else if (numValue !== undefined) {
            // Handle undefined case if needed
            totalMemorySize += 8; // Extra overhead for undefined value
        }
    });

    // Convert bytes to megabytes (MB)
    const memorySizeInMB = totalMemorySize / (1024 * 1024); // 1 MB = 1024 * 1024 bytes

    return memorySizeInMB;
}