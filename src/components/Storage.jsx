export const setDataStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export const getDataStorage = (key) => {
    return localStorage.getItem(key);
}

export const clearAllStorage = () => {
    localStorage.clear();
}

export const clearDataStorage = (key) => {
    localStorage.removeItem(key);
}