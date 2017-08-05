/* global localStorage */
import { head } from 'lodash/fp';
import newId from '../../../utils/api';

const tableName = 'flocks';

const loadFlocks = () => (
  new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(localStorage.getItem(tableName)) || []);
    } catch (error) {
      reject('Bad JSON data in flock list');
    }
  })
);

const loadFlock = (id) => (
  new Promise((resolve, reject) => {
    try {
      const intId = parseInt(id, 10);
      const list = JSON.parse(localStorage.getItem(tableName)) || [];
      resolve(head(list.filter((fl) => fl.id === intId)));
    } catch (error) {
      reject(`Flock ${id} not found`);
    }
  })
);

const saveFlocks = (flocks) => (
  new Promise((resolve, reject) => {
    try {
      localStorage.setItem(tableName, JSON.stringify(flocks));
      resolve(flocks);
    } catch (error) {
      reject('Bad JSON data in flock list');
    }
  })
);

// upsert
const upsertFlock = (flock) => (
  new Promise((resolve, reject) => {
    loadFlocks().then((currentFlocks) => {
      const newFlock = Object.assign(flock);
      if (!newFlock.id) { // insert
        newFlock.id = newId();
        currentFlocks.push(newFlock);
        resolve(saveFlocks(currentFlocks));
      } else { // update
        resolve(saveFlocks(
          currentFlocks.map((cf) => {
            if (cf.id === flock.id) {
              return (flock);
            }
            return cf;
          }),
        ));
      }
    }).catch((err) => {
      reject(err);
    });
  })
);

const deleteFlock = (flock) => (
  new Promise((resolve, reject) => {
    loadFlocks().then((currentFlocks) => {
      resolve(saveFlocks(currentFlocks.filter((fl) => fl.id !== flock.id)));
    }).catch((err) => {
      reject(err);
    });
  })
);

export {
  loadFlock,
  loadFlocks,
  saveFlocks,
  upsertFlock,
  deleteFlock,
};
