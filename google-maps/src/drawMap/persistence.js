/* global localStorage */
function loadLandmarks() {
  try {
    return JSON.parse(localStorage.getItem('landmarks'));
  } catch (error) {
    return [];
  }
}

function saveLandmarks(toSave) {
  console.log('saving landmarks');
  localStorage.setItem('landmarks', JSON.stringify(toSave));
}

function loadDefaultLocation() {
  try {
    return JSON.parse(localStorage.getItem('defaultLocation'));
  } catch (error) {
    return null;
  }
}

function saveDefaultLocation(location) {
  console.log('saving location', location);
  localStorage.setItem('defaultLocation', JSON.stringify(location));
}

export { loadLandmarks, saveLandmarks, loadDefaultLocation, saveDefaultLocation };
