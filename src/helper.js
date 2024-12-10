//****************************************************************************************************
// JSON-server CRUD functionality

const baseURL = 'https://wandr-personal-travel-journal-be-production.up.railway.app';

function getJSONByUserId(userId) {

  // Make the API call to your Lambda (via API Gateway)
  return fetch(`${baseURL}/trips?userId=${userId}`)
    .then(res => {
      if (!res.ok) {
        console.error(`Error fetching user information! Status: ${res.status}`);
        // throw new Error(`Error fetching forecast! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error('Request failed', err);
      // You can handle further error logic here if needed
    });
}

function getActivitiesByTripId(tripId) {

  return fetch(`${baseURL}/activities?tripId=${tripId}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function postJSONToDb(dbKey, jsonObj) {

    const snake_object = camelToSnake(jsonObj);

    return fetch(`${baseURL}/new/${dbKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(snake_object)
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
}

function patchJSONToDb(dbKey, Id, jsonObj) {

    const snake_object = camelToSnake(jsonObj);

    fetch(`${baseURL}/update/${dbKey}/${Id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(snake_object)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => console.log("EDITED", data))
    .catch(e => console.error(e));
}

function deleteJSONFromDb(dbKey, Id) {

  fetch(`http://localhost:6001/${dbKey}/${Id}`, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => console.log("DELETED", data))
  .catch(e => console.error(e));
}

function getWeatherForecast(locationSearch) {
  const locSearchRev = locationSearch.replace(/ /g, "%20");

  // Make the API call to your Lambda (via API Gateway)
  return fetch(`https://ieqgd271i6.execute-api.us-east-1.amazonaws.com/prod/weather?location=${locSearchRev}`)
    .then(res => {
      if (!res.ok) {
        console.error(`Error fetching forecast! Status: ${res.status}`);
        // throw new Error(`Error fetching forecast! Status: ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error('Request failed', err);
      // You can handle further error logic here if needed
    });
}

function formatDate(dateString) {
  let date;
  
  // Handle ISO 8601 format correctly
  if (dateString.includes('T')) {
    date = new Date(dateString); // Handles both '2025-02-15T00:00:00Z' and similar formats
  } else {
    date = new Date(dateString.replace(/-/g, '/')); // For simple '2025-02-15' format
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}


function isPastDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(dateString);
  compareDate.setHours(0, 0, 0, 0);

  return compareDate < today;
}

// Utility to convert snake_case to camelCase
const snakeToCamel = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel);
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelCaseKey] = snakeToCamel(obj[key]);
      return result;
    }, {});
  }

  return obj;
};

// Utility to convert camelCase to snake_case
const camelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }

  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      result[snakeCaseKey] = camelToSnake(obj[key]);
      return result;
    }, {});
  }

  return obj;
};

export {getJSONByUserId, getActivitiesByTripId, postJSONToDb, patchJSONToDb, deleteJSONFromDb, getWeatherForecast, formatDate, isPastDate, snakeToCamel};