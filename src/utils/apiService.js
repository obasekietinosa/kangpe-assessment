import queryString from 'querystring';
/**
 * @class ApiService
 * @description Contains methods for making asynchronous Http requests
 * @exports ApiService
 */

 const BASE_URL = "https://pro-zone.herokuapp.com";
 const BEARER = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0MTgzMzUwLCJleHAiOjE1OTY3NzUzNTB9.SS17FWeuomLQxAqyIEiPk0hTjLcKjh91XpM6U2X7dkM"

class ApiService {
  static ENDPOINTS = {
    providers: `${BASE_URL}/providers/`,
    imageUpload: `${BASE_URL}/upload/`

  }

  /**
   * @method get
   * @description makes a GET request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async get(url, data=null) {
    const response = await fetch(
      `${url}${data ? `?${queryString.stringify(data)}` : ''}`,
      {
        method: 'GET',
        headers: {
            'Authorization': BEARER,
            'Content-Type': 'application/json'
        }
      }
    );
    return response.json();
  }


  /**
   * @method post
   * @description makes a POST request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async post(url, data) {
    const response = await fetch(
      url, {
        method: 'POST',
        headers: {
            'Authorization': BEARER,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    return response.json();
  }


  /**
   * @method put
   * @description makes a PUT request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async put(url, data) {
    const response = await fetch(
      url, {
        method: 'PUT',
        headers: {
            'Authorization': BEARER,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    return response.json();
  }
}

export default ApiService;
