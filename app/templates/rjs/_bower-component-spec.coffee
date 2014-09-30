describe '<%= coffeeClass %>', ->

  module = null

  beforeEach (done) ->
    require ["<%= slug %>"], (mod) ->
      module = new mod()
      done()

  afterEach ->
    module = null

  it 'exists', ->
    expect(module).toBeTruthy()
