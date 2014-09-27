describe 'sem-campaigm', ->

  module = null

  beforeEach (done) ->
    require ['dist/shared/sem-campaign'], (campaign) ->
      module = new campaign()
      done()

  afterEach ->
    module = null
    $.removeCookie('campaign_id')

  describe '#storeSemFlags', ->

    describe 'campaign session', ->
      it 'sets a cookie', ->
        spyOn(module, 'queryParams').and.returnValue('?wt.mc_id=123')
        spyOn(module, 'cookieOptions').and.returnValue({ expires: 1, path: '/' })
        module.storeSemFlags()
        expect($.cookie('campaign_id')).toEqual('123')

    describe 'adobe efficient frontier campaign session', ->
      it 'sets a cookie', ->
        spyOn(module, 'queryParams').and.returnValue('?ef_id=123')
        spyOn(module, 'cookieOptions').and.returnValue({ expires: 1, path: '/' })
        module.storeSemFlags()
        expect($.cookie('ef_id')).toEqual('123')

    describe 'organic session', ->
      it 'does not set a cookie', ->
        spyOn(module, 'queryParams').and.returnValue('')
        module.storeSemFlags()
        expect($.cookie('campaign_id')).toBeUndefined()

  describe '#fireLeadPixel', ->

    it 'fires pixel', ->
      listingId= '123'
      pixel = module.fireLeadPixel(listingId)[0]
      expect(pixel.nodeName).toEqual('IMG')
      expect(pixel.src).toMatch new RegExp(/https:\/\/pixel2370.everesttech.net\/2370\/p\?\&ev_lead\=1\&ev_transid\=1.*/)
      expect(pixel.src).toMatch new RegExp(listingId)
