const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const ad_data = require('../../../helper/utils/admin_data.json');
const SignUp = require('../../../pages/Admin/SignUp');
const Registration = require('../../../pages/Admin/Registration');
const Manage_Member = require('../../../pages/Admin/Manage_Member');
const Member_Assistance = require('../../../pages/Admin/Member_Assistance')
const Payment_Approval = require('../../../pages/Admin/Payment_Approval');
const Login = require("../../../pages/Member/Login");
const Home = require("../../../pages/Member/Home");
const DashboardCFP = require("../../../pages/Member/DashboardCFP");
const LOAManagement = require("../../../pages/Member/LOAManagement");


//setDefaultTimeout(120 * 1000);// Set global timeout for all actions
setDefaultTimeout({
    step: 90000,           // Timeout for actions like clicks, typing
    hook: 90000,           // Timeout for hooks
    timeout: 120000        // Timeout for scenarios and scenario outlines
});

//Object Instantiations
const signUp = new SignUp(pageFixture.page);
const registration = new Registration(pageFixture.page);
const manage_Member = new Manage_Member(pageFixture.page);
const member_Assistance = new Member_Assistance(pageFixture.page);
const payment_Approval = new Payment_Approval(pageFixture.page);

const login = new Login(pageFixture.page);
const home = new Home(pageFixture.page);
const dashboardCFP = new DashboardCFP(pageFixture.page);
const loaManagement = new LOAManagement(pageFixture.page);


let org_name = signUp.org_name;
let email_id = signUp.email_id;
//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the application and signUp', async function () {
    await signUp.signup(); //Sign Up
});

Then('Login Again', async function () {
    await signUp.login_Again("oldpassword"); //Login Again after SignUp

    await signUp.changePasswordAndTFA(); //Change Password & Two Factor Autentication
});

Then('Login Again after Change Password', async function () {

    console.log(`Email ID =====${email_id}`);

    await signUp.login_Again("newpassword"); //Login Again after Change Password

    await signUp.OTP(); //Fill OTP
});

Then('PreRegistration', async function () {
    console.log(`Organization name : ${org_name}`);
    await registration.NOAR_Details(ad_data.AD_01.NOAR); //NOAR Details 

    await registration.basic_Details(ad_data.AD_01.natureofapplicant, ad_data.AD_01.gsttype); //Basic Details

    await registration.connection_Details(ad_data.AD_01.discomType, ad_data.AD_01.Max_Inj_Cap, ad_data.AD_01.Max_Draw_Cap); //Connection Details

    await registration.bank_Details(); //Bank Details

    await registration.upload_Documents(); //Document Upload

});



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the application and login as a admin', async function () {
    await login.login(ad_data.admin, ad_data.admin_password); //Login as a admin 
    await signUp.OTP(); //OTP Validation 
});

Then('Approve the new discom user', async function () {
    await manage_Member.click_Manage_Member();
    await manage_Member.approve_Member(org_name);  //Member assitance
    await member_Assistance.clickMemberAssitance();
    await member_Assistance.subscription_Plan_Selection(org_name); //Member Assitance
    await payment_Approval.clickPaymentApproval(); //Payment Approval
    await payment_Approval.paymentApproval(org_name);
    await manage_Member.member_rights(ad_data.AD_01.selectall, ad_data.AD_01.Home, ad_data.AD_01.Manage_User, ad_data.AD_01.FormatD, ad_data.AD_01.LOA_Generation, ad_data.AD_01.Award, ad_data.AD_01.Respond, ad_data.AD_01.LOA_Management)





});

Then('Login Again after Change Password', async function () {


});

Then('PreRegistration', async function () {


});