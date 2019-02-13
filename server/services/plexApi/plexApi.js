import axios from 'axios';
import buildUrl from 'build-url';
import parser from 'xml2json';
import config from '../../../config';

function PlexApiClient(options) {
  this.setOptions(options);
}

PlexApiClient.prototype.setOptions = function(options) {
  this.options = options || {};
};

PlexApiClient.prototype.getUsersUrlParams = function() {
  return {
    host: config.plex.plexApiUrl,
    path: '/users',
    queryParams: {
      'X-Plex-Token': this.options.token || config.plex.token,
    },
  };
};

PlexApiClient.prototype.mostWatchedUrlParams = function(type, limit = 10) {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/all/top',
    queryParams: {
      type,
      limit,
      'X-Plex-Token': this.options.token || config.plex.token,
    },
  };
};

PlexApiClient.prototype.buildUrl = function(urlParams) {
  const params = urlParams;
  const {host} = params;
  delete params.host;
  const urlHash = params;

  return buildUrl(host, urlHash);
};

const formatResponse = response => {
  const xmlResponse = response.headers['content-type'].includes('xml');
  if (xmlResponse) {
    return JSON.parse(parser.toJson(response.data));
  }
  return response.data;
};

PlexApiClient.prototype.request = async function(url) {
  console.log('Request URL', url);
  return new Promise((resolve, reject) => {
    const httpClient = this.options.httpClient || axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(formatResponse(response));
      })
      .catch(error => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('data', error.response.data);
          console.log('status', error.response.status);
          console.log('headers', error.response.headers);
          return reject(error.response);
        }
        if (error.request) {
          // The request was made but no response was received
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
        return reject(error);
      });
  });
};

PlexApiClient.prototype.getUsers = async function() {
  const urlParams = this.getUsersUrlParams();
  const getUsersUrl = this.buildUrl(urlParams);
  const response = await this.request(getUsersUrl);
  return response.MediaContainer.User;
};

PlexApiClient.prototype.getMostWatched = async function(type, limit = 10) {
  const urlParams = this.mostWatchedUrlParams(type, limit);
  const mostWatchedUrl = this.buildUrl(urlParams);
  const response = await this.request(mostWatchedUrl);
  return response.MediaContainer.Metadata;
};

const plexApiClient = (options = []) => {
  return new PlexApiClient(options);
};

export default plexApiClient;
