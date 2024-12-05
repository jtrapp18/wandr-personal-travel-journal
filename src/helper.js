//****************************************************************************************************
// JSON-server CRUD functionality

function getJSONByKey(dbKey) {

    return fetch(`http://localhost:6001/${dbKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getJSONById(dbKey, Id) {

    return fetch(`http://localhost:6001/${dbKey}/${Id}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getEmbeddedJSON(baseKey, embeddedKey) {

    return fetch(`http://localhost:6001/${baseKey}?_embed=${embeddedKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function getEmbeddedJSONById(baseKey, baseId, embeddedKey) {

    return fetch(`http://localhost:6001/${baseKey}/${baseId}?_embed=${embeddedKey}`)
    .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
}

function postJSONToDb(dbKey, jsonObj) {

    return fetch(`http://localhost:6001/${dbKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObj)
        })
        .then(res => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
}

function patchJSONToDb(dbKey, Id, jsonObj) {

    fetch(`http://localhost:6001/${dbKey}/${Id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObj)
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
        throw new Error(`Error fetching forecast! Status: ${res.status}`);
      }
      return res.json();
    })
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

export {getJSONByKey, getJSONById, getEmbeddedJSON, getEmbeddedJSONById, postJSONToDb, patchJSONToDb, deleteJSONFromDb, getWeatherForecast, formatDate, isPastDate};