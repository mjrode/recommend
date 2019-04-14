import parser from 'xml2json';
import uuid from 'uuid';
import btoa from 'btoa';
import request from 'request-promise';
import models from '../../db/models';

const rxAuthToken = /authenticationToken="([^"]+)"/;

const tokenUrlParams = (username, password) => ({
  url: 'https://plex.tv/users/sign_in.xml',
  headers: {
    'X-Plex-Client-Identifier': uuid(),
    Authorization: `Basic ${encryptUserCreds(username, password)}`,
  },
});

const encryptUserCreds = (username, password) => {
  const creds = `${username}:${password}`;
  return btoa(creds);
};

const fetchToken = async (username, password) => {
  try {
    const res = await request.post(tokenUrlParams(username, password));
    const token = res.match(rxAuthToken)[1];
    return token;
  } catch (error) {
    return error.message;
  }
};

const plexUrlParams = plexToken => ({
  url: 'https://plex.tv/pms/servers.xml',
  headers: {
    'X-Plex-Client-Identifier': uuid(),
    'X-Plex-Token': plexToken,
  },
});

const getPlexPin = async user => {
  try {
    const params = {
      url: 'https://plex.tv/pins.xml',
      headers: {
        'X-Plex-Client-Identifier': user.googleId,
      },
    };
    const res = await request.post(params);
    const formattedResponse = JSON.parse(parser.toJson(res));

    return formattedResponse;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const checkPlexPin = async (pinId, user) => {
  try {
    const params = {
      url: `https://plex.tv/pins/${pinId}.xml`,
      headers: {
        'X-Plex-Client-Identifier': user.googleId,
      },
    };
    const res = await request.get(params);
    const formattedResponse = JSON.parse(parser.toJson(res));
    console.log(
      'TCL: checkPlexPin -> formattedResponse',
      formattedResponse.pin.auth_token,
    );
    return formattedResponse.pin.auth_token;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getPlexUrl = async (user, token) => {
  const params = {
    url: `https://plex.tv/pms/:/ip`,
    headers: {
      'X-Plex-Client-Identifier': user.googleId,
    },
  };
  const plexUrl = await request.get(params);

  const fullPlexUrl = await plexPort(token, plexUrl, user);
  return fullPlexUrl;
};

const plexPort = async (plexToken, plexUrl, user) => {
  try {
    const res = await request.get(plexUrlParams(plexToken));
    let formattedResponse = JSON.parse(parser.toJson(res)).MediaContainer
      .Server;
    if (!Array.isArray(formattedResponse)) {
      formattedResponse = [formattedResponse];
    }
    console.log('formatted response', formattedResponse);
    console.log('url--', plexUrl);
    const server = formattedResponse.filter(
      server => server.address.toString().trim() === plexUrl.toString().trim(),
    );
    console.log('server', server);
    await models.User.update(
      {
        plexToken: plexToken.trim(),
        plexUrl: `http://${server[0].address}:${server[0].port}`.trim(),
      },
      {where: {googleId: user.googleId}},
    );
    console.log('server--', server);
    return `http://${server[0].address}:${server[0].port}`;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export default {fetchToken, plexPort, getPlexPin, checkPlexPin, getPlexUrl};
