/**
 * Get path
 *
 * @return {string} pathname
 */
const getPath = () => {
    return window.location.pathname;
}

/**
 * Get search string
 *
 * @return {string}
 */
const getSearch = () => {
    return window.location.search;
}

/**
 * Get search params
 *
 * @return {object} URLSearchParams instance
 */
const getParams = () => {
    const search = getSearch();
    const params = new URLSearchParams(search);

    return params;
}

/**
 * Set search params
 *
 * @param {object} params
 *
 * @return {string} search params as string
 */
 const setParams = (params) => {
    if (typeof params !== 'object') {
        return '';
    }

    let paramValue     = '';
    const search       = getSearch();
    const searchParams = new URLSearchParams(search);

    Object.keys(params).map((paramName) => {
        paramValue = params[paramName];

        if (paramValue){
            searchParams.set(paramName, decodeURIComponent(paramValue));
        }

        paramValue = '';

        return true;
    });

    return searchParams.toString();
}

/**
 * Get specific search param
 *
 * @param {string} paramName
 *
 * @return {string} paramValue
 */
const getParam = (paramName) => {
    const search     = getSearch();
    const params     = new URLSearchParams(search);
    const paramValue = params.get(paramName);

    return paramValue;
}

/**
 * Get flow data
 *
 * @return {object} flow data
 */
const get = () => {
    const path   = getPath();
    const search = getSearch();

    return {
        path,
        search,
    };
}

/* Constant object to represent Service Functions */
export const flow = {
    get,
    getPath,
    getParam,
    getParams,
    getSearch,
    setParams,
};
