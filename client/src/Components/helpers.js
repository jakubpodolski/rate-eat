export const API_URL = 'http://localhost:8080/api/';
export const APP_NAME = 'rate-eat-app';

export const getFromStorage = (key) => {
  if (!key) return null;
  
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) return JSON.parse(valueStr);
    return null;
  } catch (err) {
    return null;
  }
};

export const setInStorage = (key, obj) => {
  if (!key) {
    console.error('Error: Key is missing');
  } 
  
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }
};

export const deleteInStorage = (key) => {
  if (!key) {
    console.error('Error: Key is missing');
  }
  
  try {
    localStorage.removeItem(APP_NAME)
  } catch (err) {
    console.error(err);
  }
}