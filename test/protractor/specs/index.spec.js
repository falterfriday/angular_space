describe('The root page loads', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
    });
    it('header should have a title', function(){
        expect(browser.getTitle()).toEqual('Leaving Home');
    });
    it('header should read "Leaving Home" ', function(){
        var header = element(by.css('.header'));
        expect(header.getText()).toContain('Leaving Home');
    });
    it('header should have menu', function(){
        var header = element(by.css('.header'));
        expect(header.getText()).toContain('menu');
    });
    it('header should have login/register', function(){
        var header = element(by.css('.header'));
        expect(header.getText()).toContain('Login/Register');
    });
    it('should have a login/reg button that works', function(){
        element(by.css('.login_reg_button')).click();
        // browser.sleep(2000);
        var dialog = element(by.css('.md-toolbar-tools'));
        expect(dialog.getText()).toContain('Please Log In');
    });
});
