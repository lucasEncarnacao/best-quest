class FetchHelper {
  static get = (url, token = null) => {
    let options = {};

    if (token !== null) {
      options = {
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }

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
}

export default FetchHelper;
