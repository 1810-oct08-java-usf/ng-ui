


/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 * logs the user in as an admin and makes sure they are brought to the proper page
 */
describe('Logging in as an Admin', function () {
        let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
    it('check login with correct credentials', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('admin');
        element(by.id('mat-input-1')).sendKeys('p4ssw0rd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        expect(browser.getCurrentUrl(`${url}home`));
        let row = element.all(by.css('.mat-table tr')).get(1);
        let cells = row.all(by.tagName('td'));
        expect(cells.get(0).getText()).toEqual('admin');
        expect(cells.get(1).getText()).toEqual('Adam');
        expect(cells.get(2).getText()).toEqual('Inn');
        expect(cells.get(3).getText()).toEqual('admin@revature.com');
        expect(cells.get(4).getText()).toEqual('ROLE_ADMIN');

        element(by.id('mat-input-2')).sendKeys('test');
        row = element.all(by.css('.mat-table tr')).get(1);
        cells = row.all(by.tagName('td'));

        expect(cells.get(0).getText()).toEqual('test-user');
        expect(cells.get(1).getText()).toEqual('Tester');
        expect(cells.get(2).getText()).toEqual('McTesterson');
        expect(cells.get(3).getText()).toEqual('test@revature.com');

        element(by.id('mat-tab-label-0-2')).click();

        row = element.all(by.css('.mat-table tr')).get(1);
        cells = row.all(by.tagName('td'));

        expect(cells.get(0).getText()).toEqual('Revature Package Manager (RPM)');
        expect(cells.get(1).getText()).toEqual('1810-oct08-java-usf');
        expect(cells.get(2).getText()).toEqual('Wezley Singleton');
        expect(cells.get(3).getText()).toEqual('Java/J2EE');
        expect(cells.get(4).getText()).toEqual('Approved');

        element.all(by.id('icon')).get(1).click();
        browser.sleep(2000);
        element.all(by.css('.mat-menu-item')).get(1).click();
        browser.waitForAngular();


    })
    /**
     * Ensures admin is not logged in with improper credentials
     */
    it('check login with incorrect password', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('admin');
        element(by.id('mat-input-1')).sendKeys('p5ssw0rd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl(`${url}`));
        
    })
    /**
     * Ensures admin is not logged in with improper credentials
     */
    it('check login with incorrect username', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('acmin');
        element(by.id('mat-input-1')).sendKeys('p4ssw0rd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl(`${url}`));
    })
    /**
     * Ensures admin is not logged in with no credentials
     */
    it('check login with no credentials', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('');
        element(by.id('mat-input-1')).sendKeys('');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        expect(browser.getCurrentUrl(`${url}`));
    })
    /**
     * Ensures admin is not logged in with improper credentials
     */
    it('check login with incorrect credentials', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys('aaaddddddmmmmmiiiinnnnnn');
        element(by.id('mat-input-1')).sendKeys('ppppp44444sssswwwwwwwoooorrrd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl(`${url}`));
    })
    /**
     * Ensures admin is not logged in with spaces
     */
    it('check login with spaces', function () {
        browser.get(`${url}`);
        element(by.id('mat-input-0')).sendKeys(' admin');
        element(by.id('mat-input-1')).sendKeys('p5ssw0rd');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        browser.waitForAngular();
        browser.switchTo().alert().accept();
        expect(browser.getCurrentUrl(`${url}`));
    })
})

