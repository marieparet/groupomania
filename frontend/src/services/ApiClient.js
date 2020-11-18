class ApiClient {
  constructor () {
    this.baseUrl = 'http://localhost:3000/'
  }

  get (path) {
    return fetch(this.baseUrl + path, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
    })
      .then(response => response.json())
      .catch(() => alert("Impossible de récupérer les données de l'API"))
  }

  post (path, body) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
    }).then(response => response.json())
  }

  delete (path) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken')
      }
    }).then(response => response.json())
  }
}

export const apiClient = new ApiClient()
