function loadLandmarks() {

  try {
    return JSON.parse(localStorage.getItem('landmarks'));
  } catch (error) {
    return [];
  }
}

function saveLandmarks(toSave) {

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

  localStorage.setItem('defaultLocation', JSON.stringify(location));
  console.log('saving location', location);
}

export { loadLandmarks, saveLandmarks, loadDefaultLocation, saveDefaultLocation }
