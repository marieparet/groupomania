class ApiClient {
  constructor () {
    this.baseUrl = 'http://localhost:3000/'
  }

  headers (options = {}) {
    const contentType = options.isFormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }

    return {
      ...contentType,
      Authorization: 'Bearer ' + localStorage.getItem('userToken')
    }
  }

  get (path) {
    return fetch(this.baseUrl + path, {
      headers: this.headers()
    })
      .then(response => response.json())
      .catch(() => alert("Impossible de récupérer les données de l'API"))
  }

  post (path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    }).then(response => response.json())
  }

  delete (path) {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this.headers()
    }).then(response => response.json())
  }

  put (path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: 'PUT',
      body: options.isFormData ? body : JSON.stringify(body),
      headers: this.headers(options)
    }).then(response => response.json())
  }
}

export const apiClient = new ApiClient()
