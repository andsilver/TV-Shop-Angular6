var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [],
    stripePrefix: 'dist/nl',
    root: 'dist/nl/',
    plugins:[
        new SWPrecacheWebpackPlugin({
            cacheId: 'ng-pwa-nl',
            filnlame: 'service-worker.js',
            staticFileGlobs: [
                'dist/nl/index.html',
                'dist/nl/**.js',
                'dist/nl/**.css'
            ],

        })
    ],
    stripePrefix: 'dist/nl/assets',
    mergeStaticsConfig: true
};