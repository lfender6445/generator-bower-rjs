
require.config({
  baseUrl: '../',
  shim: {},
  paths: {
    requirejs: "../vendor/bower/requirejs/require"
    <%= slug %>: "dist/<%= slug %>"
  },
  packages: [

  ]
});
