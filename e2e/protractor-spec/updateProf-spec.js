

/**
 * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
 */

let url = 'http://tn-rpm-test.s3-website-us-east-1.amazonaws.com/';
//We use the before all function so that a user is logged in for these tests.
beforeAll(function(){
    browser.get(`${url}`);
    element(by.id('mat-input-0')).sendKeys('test-user');
    element(by.id('mat-input-1')).sendKeys('test');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.waitForAngular();
    
})
    
    /**
     * @author Abe Schroeder, Omar Jamal, Zach Marazita, Thanh Nguyen, Mitchell Elbus (190107-Java-Spark-USF)
     * Test the persistence of the update profile function
     */
    
    describe('This tests the update Profile function', function(){
        
    // after we update the user we want to get this user from the database and make sure the the changes we persisted.
    async function getUser(){
        let response = await fetch( `${url}id/2`,{
         method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
            
        });
        return JSON.parse(response.body);
        };
        it('Should update the user ', function(){
             browser.get(`${url}home`);
         
        browser.sleep(100);
        browser.get(`${url}account/2`);
        browser.sleep(100);
        element.all(by.tagName('button')).get(3).click();
        
        browser.sleep(1000);
         element(by.id('inputFirstName')).sendKeys('Demo');
         element(by.id('inputLastName')).sendKeys('McDemoson');
        element(by.id('currInputPassword')).sendKeys('Demo');
       element(by.id('inputPassword')).sendKeys('Demo');
       element.all(by.tagName('button')).get(1).click();
       browser.waitForAngular();
       let user = getUser();
       let myUser = {id: 2, firstName: 'Demo', lastName:'McDemoson',email:'demo@revature.com'
        ,username: 'TheDemo', password:'Demo'};
        expect(myUser).toEqual(user);})
    })
    