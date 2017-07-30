/* global localStorage */
const tableName = 'flocks';

function loadFlocks() {
  try {
    return JSON.parse(localStorage.getItem(tableName)) || [];
  } catch (error) {
    return [];
  }
}

function saveFlocks(flocks) {
  localStorage.setItem(tableName, JSON.stringify(flocks));
}

function addFlock(flock) {
  const currentFlocks = loadFlocks();
  currentFlocks.push(flock);
  saveFlocks(currentFlocks);
}


export { loadFlocks, addFlock, saveFlocks };
