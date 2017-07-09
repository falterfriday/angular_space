describe('The login partial is functional', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('should show the login partial when login button is clicked', function(){
        var dialog = element(by.css('.md-toolbar-tools'));
        expect(dialog.getText()).toContain('Please Log In');
    });
    it('should have first_name text input fields', function(){
        var first_name = element(by.model('newUser.first_name'));
        first_name.sendKeys('Test');
        expect(first_name.getAttribute('value')).toEqual('Test');
    });
    it('should have last_name text input fields', function(){
        var last_name = element(by.model('newUser.last_name'));
        last_name.sendKeys('User');
        expect(last_name.getAttribute('value')).toEqual('User');
    });
    it('should have email text input fields', function(){
        var email = element(by.model('newUser.email'));
        email.sendKeys('email@email.com');
        expect(email.getAttribute('value')).toEqual('email@email.com');
    });
    it('should have email text input fields', function(){
        var password = element(by.model('newUser.password'));
        password.sendKeys('abcd1234');
        expect(password.getAttribute('value')).toEqual('abcd1234');
    });
    it('should have email text input fields', function(){
        var pw_conf = element(by.model('newUser.pw_conf'));
        pw_conf.sendKeys('abcd1234');
        expect(pw_conf.getAttribute('value')).toEqual('abcd1234');
    });
});
