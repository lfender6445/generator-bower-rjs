describe('sem-campaigm', function() {
  var module;
  module = null;
  beforeEach(function(done) {
    return require(['dist/shared/sem-campaign'], function(campaign) {
      module = new campaign();
      return done();
    });
  });
  afterEach(function() {
    module = null;
    return $.removeCookie('campaign_id');
  });
  describe('#storeSemFlags', function() {
    describe('campaign session', function() {
      return it('sets a cookie', function() {
        spyOn(module, 'queryParams').and.returnValue('?wt.mc_id=123');
        spyOn(module, 'cookieOptions').and.returnValue({
          expires: 1,
          path: '/'
        });
        module.storeSemFlags();
        return expect($.cookie('campaign_id')).toEqual('123');
      });
    });
    describe('adobe efficient frontier campaign session', function() {
      return it('sets a cookie', function() {
        spyOn(module, 'queryParams').and.returnValue('?ef_id=123');
        spyOn(module, 'cookieOptions').and.returnValue({
          expires: 1,
          path: '/'
        });
        module.storeSemFlags();
        return expect($.cookie('ef_id')).toEqual('123');
      });
    });
    return describe('organic session', function() {
      return it('does not set a cookie', function() {
        spyOn(module, 'queryParams').and.returnValue('');
        module.storeSemFlags();
        return expect($.cookie('campaign_id')).toBeUndefined();
      });
    });
  });
  return describe('#fireLeadPixel', function() {
    return it('fires pixel', function() {
      var listingId, pixel;
      listingId = '123';
      pixel = module.fireLeadPixel(listingId)[0];
      expect(pixel.nodeName).toEqual('IMG');
      expect(pixel.src).toMatch(new RegExp(/https:\/\/pixel2370.everesttech.net\/2370\/p\?\&ev_lead\=1\&ev_transid\=1.*/));
      return expect(pixel.src).toMatch(new RegExp(listingId));
    });
  });
});
