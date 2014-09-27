describe {<%= validVariableName %>}, ->

  module = null

  beforeEach (done) ->
    require ["dist/#{<%= validVariableName %>}"], (mod) -> module = new mod()

  afterEach ->
    module = null

  it 'should do something', ->
    assert(2+2).eq(4)
