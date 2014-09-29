// This will build all 3 files into a single concatenated pkg
// r.js -o require.build.js optimize=none
({
    baseUrl: "",
    paths: {
      everestjs: './vendor/bower/everestjs/index',
      requirejs: './vendor/bower/requirejs/require',
      'jquery.cookie': './vendor/bower/jquery.cookie/jquery.cookie',
      'sem-campaign': 'dist/shared/sem-campaign',
      'efficient-frontier': 'dist/shared/efficient-frontier',
      jquery: './vendor/bower/jquery/jquery'
    },
    // Exclude the packages you expect to be included in the parent project
    exclude: ['jquery','jquery.cookie'],
    name: "sem-campaign",
    out: "./dist/sem-campaign.js"
})
