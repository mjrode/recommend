import config from '../../../config';
import helpers from '../helpers';

const getUsersUrlParams = function(user) {
  return {
    host: user.plexUrl,
    path: '/users',
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getSectionsUrlParams = function(user) {
  return {
    host: user.plexUrl,
    path: '/library/sections',
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const mostWatchedUrlParams = function(accountId, sectionKey, limit = 10, user) {
  return {
    host: user.plexUrl,
    path: '/library/all/top',
    queryParams: {
      ...(accountId && {accountId}),
      ...(sectionKey && {type: sectionKey}),
      ...(limit && {limit}),
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getLibraryDataBySectionUrlParams = function(sectionId, user) {
  return {
    host: user.plexUrl,
    path: `/library/sections/${sectionId}/all`,
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getUsers = async function(user) {
  try {
    const urlParams = getUsersUrlParams(user);
    const getUsersUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getUsersUrl);
    return response.MediaContainer.User;
  } catch (error) {
    return error;
  }
};

const getMostWatched = async function(
  {accountId, sectionKey, limit = 10},
  user,
) {
  try {
    const urlParams = mostWatchedUrlParams(accountId, sectionKey, limit, user);
    const mostWatchedUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(mostWatchedUrl);
    return response.MediaContainer.Metadata;
  } catch (error) {
    console.log(error);
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getSections = async function(user) {
  try {
    const urlParams = getSectionsUrlParams(user);
    const getSectionsUrl = helpers.buildUrl(urlParams);
    console.log('sec -url', getSectionsUrl);
    const response = await helpers.request(getSectionsUrl);
    console.log('mike-', response);
    return response.MediaContainer.Directory;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getLibraryDataBySection = async function({sectionKey}, user) {
  try {
    console.log('sectionId--', sectionKey);
    const urlParams = getLibraryDataBySectionUrlParams(sectionKey, user);
    const getLibraryDataBySectionUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getLibraryDataBySectionUrl);
    return response.MediaContainer.Metadata;
  } catch (error) {
    console.log('caught error', error);
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

export default {
  getUsers,
  getMostWatched,
  getSections,
  getLibraryDataBySection,
  getUsersUrlParams,
  getLibraryDataBySectionUrlParams,
  getSectionsUrlParams,
};
