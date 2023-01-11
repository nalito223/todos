function getData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("GET error: ", error)
    })
}
//post data
function postData(body, url) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}
// put data 
function putData(body, url) {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}
//delete data
function deleteData(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log("DELETE RESPONSE",response)
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log("Fetch error: ", error)
    })
}

export { getData, postData, deleteData, putData }  