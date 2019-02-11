import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import PlexApiClient from '../../../../server/services/plexApi/index';

nock.enableNetConnect;

const should = chai.should();

describe('plexApi', () => {
  it('sets options when passed valid options object', () => {
    const options = { token: 'plexToken' };
    const result = new PlexApiClient(options).options;
    result.should.deep.equal({
      token: 'plexToken',
    });
  });

  it('return url params object', () => {
    const options = { token: 'plexToken' };
    const result = new PlexApiClient(options).getUsersUrlParams();
    result.should.deep.equal({
      host: 'https://plex.tv',
      path: '/api/users',
      queryParams: {
        'X-Plex-Token': 'plexToken',
      },
    });
  });

  it('returns url', () => {
    const options = { token: 'plexToken' };
    const PlexApi = new PlexApiClient(options);
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    url.should.equal('https://plex.tv/api/users?X-Plex-Token=plexToken');
  });

  it('returns users', async () => {
    const usersResponse = `${__dirname}/../../../mocks/plexApi/getUsers.xml`;
    nock('https://plex.tv')
      .get('/api/users?X-Plex-Token=plexToken')
      .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });
    const options = { token: 'plexToken' };
    const PlexApi = new PlexApiClient(options);
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    const result = await PlexApi.request(url);
    result.should.deep.equal({
      MediaContainer: {
        friendlyName: 'myPlex',
        identifier: 'com.plexapp.plugins.myplex',
        machineIdentifier: '154b5ad3f3fade27a1f35eb8f44c014f7ab0d2a0',
        totalSize: '6',
        size: '6',
        User: [
          {
            id: '22100504',
            title: 'e311connell@gmail.com',
            username: 'e311connell@gmail.com',
            email: 'e311connell@gmail.com',
            recommendationsPlaylistId: 'a3ab3b4756506985',
            thumb: 'https://plex.tv/users/1a12ace72ecebbff/avatar?c=1549164875',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11520061',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
          {
            id: '22099864',
            title: 'mike.rode@malauzai.com',
            username: 'mike.rode@malauzai.com',
            email: 'mike.rode@malauzai.com',
            recommendationsPlaylistId: '4f34e0b774a38c55',
            thumb: 'https://plex.tv/users/d269a00326accf58/avatar?c=1549783460',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11519703',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
          {
            id: '22160998',
            title: 'mjrflix+carson@gmail.com',
            username: 'mjrflix+carson@gmail.com',
            email: 'mjrflix+carson@gmail.com',
            recommendationsPlaylistId: 'ffe32f53e19fad28',
            thumb: 'https://plex.tv/users/b70f48ce01d53a73/avatar?c=1549214882',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11562729',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
          {
            id: '22160913',
            title: 'mjrflix+jazz@gmail.com',
            username: 'mjrflix+jazz@gmail.com',
            email: 'mjrflix+jazz@gmail.com',
            recommendationsPlaylistId: '98a2337ca26c7420',
            thumb: 'https://plex.tv/users/df0eb846405fb1b6/avatar?c=1549214755',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11562688',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
          {
            id: '22161020',
            title: 'mjrflix+wade@gmail.com',
            username: 'mjrflix+wade@gmail.com',
            email: 'mjrflix+wade@gmail.com',
            recommendationsPlaylistId: '1d63c4534b40fd82',
            thumb: 'https://plex.tv/users/52e6cac0635b4f05/avatar?c=1549214823',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11562742',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
          {
            id: '22110937',
            title: 'rode4@gmail.com',
            username: 'rode4@gmail.com',
            email: 'rode4@gmail.com',
            recommendationsPlaylistId: 'ccb87923782deff9',
            thumb: 'https://plex.tv/users/7c0d31791846bc6a/avatar?c=1548902067',
            protected: '0',
            home: '0',
            allowSync: '0',
            allowCameraUpload: '0',
            allowChannels: '0',
            allowTuners: '0',
            allowSubtitleAdmin: '0',
            filterAll: '',
            filterMovies: '',
            filterMusic: '',
            filterPhotos: '',
            filterTelevision: '',
            restricted: '0',
            Server: {
              id: '11527625',
              serverId: '15932286',
              machineIdentifier: 'f1adbb16fead548bd0fd8dc723166dfa9ae6cd0a',
              name: 'mjrflix',
              lastSeenAt: '1549854842',
              numLibraries: '2',
              allLibraries: '1',
              owned: '1',
              pending: '0',
            },
          },
        ],
      },
    });
  });
});
