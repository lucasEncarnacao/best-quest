class FetchHelper {
  static fetchWrapper = (url, options) => {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  static genOptions = (method, payload, token) => {
    let options = {
      credentials: "same-origin",
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    if (token !== null) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    return options;
  };

  static get = (url, token = null) => {
    let options = {};

    if (token !== null) {
      options = {
        credentials: "same-origin",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return this.fetchWrapper(url, options);
  };

  static post = (url, payload, token = null) => {
    let options = this.genOptions("POST", payload, token);

    return this.fetchWrapper(url, options);
  };

  static patch = (url, payload, token = null) => {
    let options = this.genOptions("PATCH", payload, token);

    return this.fetchWrapper(url, options);
  };
}

export default FetchHelper;
