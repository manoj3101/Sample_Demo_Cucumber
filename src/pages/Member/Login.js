const { test, expect } = require('@playwright/test');
const data = require("../../helper/utils/data.json");
const pageFixture = require("../../hooks/pageFixture");
const SignUp = require('../Admin/SignUp');
const RandomFunction = require('../../helper/utils/RandomFunction');
const Wrapper = require('../../helper/wrapper/assert');


//Object Instance
const signUp = new SignUp();
const randomFunction = new RandomFunction();
const assert = new Wrapper();



class Login {
    //Constructor
    // constructor(page){
    //     pageFixture.page =page;
    // }


    //variable
    static newpassword ;


    async login(email, password) {
        await pageFixture.page.goto(data.URL, { waitUntil: 'load' });
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });
        await pageFixture.page.waitForTimeout(3000);

        //Handling the dialog if they appear due to already the user logged in some other device or browser.
        const dialog = "//*[contains(text(),'Please confirm..')]";
        if (await pageFixture.page.isVisible(dialog)) {
            await pageFixture.page.getByRole('button', { name: ' Yes ' }).click();
        }
        console.log("************************************** ✔ Successfully Logged In ✔ **************************************");
        

    }

    async changePasswordAndTFA(old_pass, new_pass) {
        await pageFixture.page.locator(signUp.old_password).fill(old_pass); //Fill Old Password
        await pageFixture.page.locator(signUp.new_password).fill(new_pass); //Fill New Password
        await pageFixture.page.locator(signUp.confirm).fill(new_pass); //Fill Confirm New Password
        await pageFixture.page.click(signUp.Change_password, { timeout: 40000 }); //Click Change Button

        //Assert the changepass Message 
        await assert.assertToContains("//*[contains(text(),'Password changed successfully')]","Password changed successfully")

        await pageFixture.page.click(signUp.TFA_OTP); //Next Step is to click OTP Two Factor Autentication
        await pageFixture.page.getByRole('button', { name: /Yes/i }).click();

        // const TFA_assert = await pageFixture.page.locator("//*[contains(text(),'Please check your OTP vie email and sms')]").textContent();
        // expect(TFA_assert).toContain("Please check your OTP vie email and sms");

        await signUp.OTP();

        await pageFixture.page.waitForTimeout(5000);
    }

    async re_login(email, password) {
        await pageFixture.page.waitForTimeout(1000);
        await pageFixture.page.getByPlaceholder('Email Address').fill(email);
        await pageFixture.page.getByPlaceholder('Password').fill(password);
        await pageFixture.page.getByRole('button', { name: 'Login' }).click({ timeout: 50000 });
        await pageFixture.page.waitForTimeout(3000);

        //Handling the dialog if they appear due to already the user logged in some other device or browser.
        const dialog = "//*[contains(text(),'Please confirm..')]";
        if (await pageFixture.page.isVisible(dialog)) {
            await pageFixture.page.getByRole('button', { name: ' Yes ' }).click();

        }
        console.log("************************************** ✔ Successfully Logged In ✔ **************************************");

    }


    async logout() {
        await pageFixture.page.waitForTimeout(2500);
        await pageFixture.page.locator("(//img[@id='userprofile1'])[1]").click();
        await pageFixture.page.locator("//a[contains(text(),'Logout')]").click();
        await pageFixture.page.waitForTimeout(2500);
    }


}
module.exports = Login;