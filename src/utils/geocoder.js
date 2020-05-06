// https://github.com/nchaulet/node-geocoder

const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',

    // Optional depending on the providers
    apiKey: '5hvSGCQNpyNfUi2RMqgFzbHoFEdU0bnK', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder