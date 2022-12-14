
/**
 * 
 * Get game value of object assigned by identifier. If the identifier has not yet been
 * used, false is returned.
 * 
 * @param {Values} identifier ID of value to set.  
 * @returns 
 */
const getVal = (identifier) => {
    if (!g$.values) {
        g$.values = {}
    }
    return g$.values[identifier] ?? false
}


/**
 * 
 * Set game value of object assigned by identifier. If values object has not yet
 * been used, it will be created.
 * 
 * @param {Values} identifier ID of value to set. 
 * @param {*} value Value to assign.
 */
const setVal = (identifier, value) => {
    if (!g$.values) {
        g$.values = {}
    }
    g$.values[identifier] = value
}
