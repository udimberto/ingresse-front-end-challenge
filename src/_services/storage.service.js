/* Storage Service  */
export const storage = {
    /**
     * Get Item stored
     *
     * @param {any} itemId
     */
    get: (itemId) => {
        return JSON.parse(window.localStorage.getItem(itemId));
    },

    /**
     * Set Item to storage
     *
     * @param {any} itemId
     * @param {any} itemContent
     */
    set: (itemId, itemContent) => {
        return window.localStorage.setItem(itemId, JSON.stringify(itemContent));
    },

    /**
     * Remove Item from storage
     *
     * @param {any} itemId
     */
    remove: (itemId) => {
        window.localStorage.removeItem(itemId);
    },

    /**
     * Clear storage
     */
    clear: () => {
        window.localStorage.clear();
    },
};
