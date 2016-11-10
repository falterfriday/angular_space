describe('The login partial is functional', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('should show the login partial when login button is clicked ', function(){
        var dialog = element(by.css('.md-toolbar-tools'));
        expect(dialog.getText()).toContain('Please Log In');
    });
    it('should have first_name text input fields', function(){
        first_name = element(by.model('newUser.first_name'));
        expect(first_name.isPresent()).toEqual(true);
    });
    it('should have last_name text input fields', function(){
        last_name = element(by.model('newUser.last_name'));
        expect(last_name.isPresent()).toEqual(true);
    });
    it('should have email text input fields', function(){
        email = element(by.model('newUser.email'));
        expect(email.isPresent()).toEqual(true);
    });
    it('should have email text input fields', function(){
        password = element(by.model('newUser.password'));
        expect(password.isPresent()).toEqual(true);
    });
    it('should have email text input fields', function(){
        pw_conf = element(by.model('newUser.pw_conf'));
        expect(pw_conf.isPresent()).toEqual(true);
    });
});
