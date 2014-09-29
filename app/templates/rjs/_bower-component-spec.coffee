describe '<%= coffeeClass %>', ->

  module = null

  beforeEach (done) ->
    require ["dist/<%= bowerComponentName %>"], (mod) -> module = new mod()
    done()

  afterEach ->
    module = null

  it 'exists', ->
    expect(module).toBeTruthy()
