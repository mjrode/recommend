import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';

const tdawMediaUrl = function(mediaName, mediaType) {
  return {
    host: config.tdaw.tdawApiUrl,
    queryParams: {
      q: mediaName,
      k: config.tdaw.token,
      info: 1,
      mediaType,
    },
  };
};

const similarMedia = async function(mediaName, mediaType) {
  try {
    const urlParams = tdawMediaUrl(mediaName, mediaType);
    const mediaUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(mediaUrl);
    return response;
  } catch (error) {
    console.log(error);
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const mostWatched = async () => {
  return models.PlexLibrary.findAll({
    order: [['views', 'DESC']],
    limit: 10,
  });
};

export default {similarMedia, tdawMediaUrl, mostWatched};
