({
    baseUrl: "",
    paths: {
      '<%= slug %> ': 'dist/shared/<%= slug %>',
    },
    // Exclude the packages you expect to be included in the parent project
    // exclude: ['jquery','jquery.cookie'],
    name: "<%= slug %>",
    out: "./dist/<%= slug %>.js"
})
