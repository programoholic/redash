import crypto from 'crypto-browserify'
// import {} from 'loadas'
const isArray = require('lodash/isArray');
const map = require('lodash/map');
const sortBy = require('lodash/sortBy');
const flatten = require('lodash/flatten');
// Algorithm based on: mAuth Resource Contract Overview-v2.pdf
export class Mauth {
  static get MWS_AUTHENTICATION_HEADER() {
    return 'x-mws-authentication';
  }

  static get MWS_TIME_HEADER() {
    return 'x-mws-time';
  }

  static get MCC_IMPERSONATE_HEADER() {
    return 'mcc-impersonate';
  }

  // Mauth Protocol V2 headers
  static get MCC_AUTHENTICATION_HEADER() {
    return 'MCC-Authentication';
  }

  static get MCC_TIME_HEADER() {
    return 'MCC-Time';
  }

  constructor(appUuid, appPrivateKey,logger, options = {}) {
    this.appUuid = appUuid;
    this.appPrivateKey = appPrivateKey.replace(/\\n/g, '\n');
    this.userUuid = options.userUuid || null;
    this.logger = logger
  }

  mccTime() {
    return Math.floor(new Date().getTime() / 1000);
  }

  validateBody(body) {
    if (!body) { body = '' }
    if (typeof body == 'object') { body = JSON.stringify(body) }
    return body;
  }
  encodeQueryParams(query) {
    /*
      pairs = [
        [{ k: 'key1', v: 'val1-1' }, { k: 'key1', v: 'val1-2' }],
        [{ k: 'key2', v: 'val2-1' }],
        [{ k: 'key3', v: 'val3-1' }, { k: 'key3', v: 'val3-2' }]
      ]
    */

    let pairs;
    if (typeof query === 'object') {
      pairs = map(query, (value, key) =>
        isArray(value) ?
          map(value, v => ({ k: `${key}`, v: `${v}` })) :
          [{ k: `${key}`, v: `${value}`}])
    } else if (typeof query === 'string') {
      pairs = query
        .split('&')
        .filter(val => !!val)
        .map(pair => ({ k: pair.split('=')[0], v: pair.split('=')[1] }))
    }

    // flatten 1 level, pairs becomes an array of { k: ..., v: ... }
    pairs = flatten(pairs)
    pairs = sortBy(pairs, ['k', 'v'])
    const result = map(pairs, pair => `${this.fixedEncodeURIComponent(pair.k)}=${this.fixedEncodeURIComponent(pair.v)}`).join('&');
    return result
  }

  generateStringToEncryptV1(verb, path, body, mccTime, appUuid) {
    body = this.validateBody(body);
    const str = [verb, path, body, appUuid, mccTime].join('\n');
    const hex = crypto.createHash('sha512').update(str).digest('hex');
    return hex;
  }

  makeMauthHeadersV1(verb, path, body, mccTime, appUuid) {
    const stringToSign = this.generateStringToEncryptV1(verb, path, body, mccTime, appUuid);
    const signature = crypto.privateEncrypt(this.appPrivateKey, Buffer.from(stringToSign)).toString('base64');
    const authHeader = 'MWS ' + appUuid + ':' + signature;
    const headers = {
      [Mauth.MWS_AUTHENTICATION_HEADER]: authHeader,
      [Mauth.MWS_TIME_HEADER]: mccTime,
    };
    return headers;
  }


  // Do not URI-encode any of the unreserved characters that RFC 3986 defines
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }


   makeStringToSignV2(verb, pathname, body, mccTime, appUuid, query) {
    if (!mccTime) { mccTime = this.mccTime() }
    if (!appUuid) { appUuid = this.appUuid }
    if (!query) { query = '' }

    body = this.validateBody(body);
    const encodedQuery = this.encodeQueryParams(query);
    const encodedBody = crypto.createHash('sha256').update(body).digest('hex');

    pathname = encodeURI(decodeURI(pathname));
    pathname = path.normalize(pathname);

    const str = [verb.toUpperCase(), pathname, encodedBody, appUuid, mccTime, encodedQuery].join('\n');

    return str;
  }

  makeSignatureV2(str) {
    return crypto.createSign('RSA-SHA512').update(str).sign(this.appPrivateKey, 'base64');
  }

  makeAuthHeaderV2(signature) {
    return 'MWSV2 ' + this.appUuid + ':' + signature + ';';
  }

  makeMauthHeadersV2(verb, path, body, mccTime, appUuid, query) {
    const stringToSign = this.makeStringToSignV2(verb, path, body, mccTime, appUuid, query);
    const signature = this.makeSignatureV2(stringToSign);
    const authHeader = this.makeAuthHeaderV2(signature);
    const headers = {
      [Mauth.MCC_AUTHENTICATION_HEADER]: authHeader,
      [Mauth.MCC_TIME_HEADER]: mccTime,
    };
    return headers;
  }

  generateMauthHeaders(verb, path, body, query, mccTime, appUuid) {
      debugger
    if (!mccTime) { mccTime = this.mccTime() }
    if (!appUuid) { appUuid = this.appUuid }
    if (!path) { path = '' }
    
    body = this.validateBody(body);
    const mauthHeadersV1 = this.makeMauthHeadersV1(verb, path, body, mccTime, appUuid);
    // const mauthHeadersV2 = this.makeMauthHeadersV2(verb, path, body, mccTime, appUuid, query);

    // send V1 and V2 headers together
    const headers = {
      ...mauthHeadersV1,
    //   ...mauthHeadersV2
    };

    if (this.userUuid) {
      headers[Mauth.MCC_IMPERSONATE_HEADER] = 'com:mdsol:users:' + this.userUuid;
    }

    return headers;
  }
}
