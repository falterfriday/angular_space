describe('The login section doesn\'t allow incomplete form submissions', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('button shouldn\'t toggle', function(){
        var first_name = element(by.model('newUser.first_name')),
            last_name = element(by.model('newUser.last_name')),
            password = element(by.model('newUser.password')),
            pw_conf = element(by.model('newUser.pw_conf'));
        first_name.sendKeys('Test');
        last_name.sendKeys('Test');
        password.sendKeys('Test');
        pw_conf.sendKeys('Test');
        expect(element(by.css('#reg_button')).getAttribute('disabled')).toBeTruthy();
    });
});
describe('The login section doesn\'t allow incomplete form submissions', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('button should toggle', function(){
        var first_name = element(by.model('newUser.first_name')),
            last_name = element(by.model('newUser.last_name')),
            email = element(by.model('newUser.email')),
            password = element(by.model('newUser.password')),
            pw_conf = element(by.model('newUser.pw_conf'));
        first_name.sendKeys('Test');
        last_name.sendKeys('Test');
        email.sendKeys('testemail@email.com');
        password.sendKeys('testpassword');
        pw_conf.sendKeys('testpassword');
        expect(element(by.css('#reg_button')).getAttribute('disabled')).toBeFalsy();
    });
});
describe('The registration section button doesn\'t allow incomplete form submissions', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('shouldn\'t toggle', function(){
        var email = element(by.model('existingUser.email'));
        email.sendKeys('testemail@email.com');
        expect(element(by.css('#log_button')).getAttribute('disabled')).toBeTruthy();
    });
});
describe('The registration section button allows complete form submissions', function(){
    beforeEach(function(){
        browser.get('http://localhost:8000/');
        element(by.css('.login_reg_button')).click();
    });
    it('shouldn\'t toggle', function(){
        var email = element(by.model('existingUser.email')),
            password = element(by.model('existingUser.password'));
        email.sendKeys('testemail@email.com');
        password.sendKeys('testpassword');
        expect(element(by.css('#log_button')).getAttribute('disabled')).toBeFalsy();
    });
});
