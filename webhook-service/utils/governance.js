export function enforceGovernance(payload) {

    // Remove all forbidden labels before hitting AEP
    const forbidden = ["C3", "I2", "S3"];
    
    forbidden.forEach(label => {
        if (payload.hasOwnProperty(label)) {
            delete payload[label];
        }
    });

    return payload;
}
