({
    name: "<%= slug %>",
    baseUrl: "",
    paths: {
      '<%= slug %>': './dist/shared/<%= slug %>',
      'requirejs':    './vendor/bower/requirejs/require'
    },
    // Exclude files you expect may be included in the parent project, eg jquery
    exclude: [],
    out: "./dist/<%= slug %>.js"
})
