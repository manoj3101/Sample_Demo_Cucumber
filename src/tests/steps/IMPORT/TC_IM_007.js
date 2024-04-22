const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const pageFixture = require("../../../hooks/pageFixture");
const data = require("../../../helper/utils/data.json");
const Login = require("../../../pages/Member/Login");
const Home = require("../../../pages/Member/Home");
const DashboardCFP = require("../../../pages/Member/DashboardCFP");
const LOAManagement = require("../../../pages/Member/LOAManagement");
const TransactionFee = require("../../../pages/Admin/TransactionFee");

//setDefaultTimeout(120 * 1000);// Set global timeout for all actions
setDefaultTimeout({
    step: 90000,           // Timeout for actions like clicks, typing
    hook: 90000,           // Timeout for hooks
    timeout: 120000        // Timeout for scenarios and scenario outlines
});

//Object Instantiations
const login = new Login(pageFixture.page);
const home = new Home(pageFixture.page);
const dashboardCFP = new DashboardCFP(pageFixture.page);
const loaManagement = new LOAManagement(pageFixture.page);
const transactionFee = new TransactionFee(pageFixture.page);



//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 1
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as initiator as per import case seven', async function () {
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("                                            TC_IM_007                                                 ");
    console.log("------------------------------------------------------------------------------------------------------");
    console.log("-----------------------------------------INITIATOR-----------------------------------------");
    await login.login(data.user1, data.user1_password);

});

Given('User started creating Call for Proposal CFP as an initiator as per import case seven', async function () {
    await home.clickCallForPropsal();

    await dashboardCFP.clickCreateCFP(data.TC_07.chooseCFP);

    await dashboardCFP.powerSwapping(data.TC_07.Power_swapping);

    await dashboardCFP.firstChoice(data.TC_07.Fisrt_choice);

    await dashboardCFP.resultPublish(data.TC_07.Result_Published);

    await dashboardCFP.importPeriod(data.TC_07.Quantum_value, data.TC_07.imp_start_date, data.TC_07.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time);

    await dashboardCFP.minimumQuantum(data.TC_07.Minimum_Quantum, data.TC_07.Minimum_QuantumValue);

    await dashboardCFP.exportPeriod(data.TC_07.exp_start_date, data.TC_07.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time);

    await dashboardCFP.publishing_time();

    await dashboardCFP.response_validityTime(data.TC_07.response_days, data.TC_07.response_hours, data.TC_07.response_mins);

    await dashboardCFP.awarding_time(data.TC_07.award_days, data.TC_07.award_hours, data.TC_07.award_mins);

    await dashboardCFP.loa_Issuance_time(data.TC_07.loa_issuance_days, data.TC_07.loa_issuance_hours, data.TC_07.loa_issuance_mins);

    await dashboardCFP.loa_Acceptance_time(data.TC_07.loa_acceptance_days, data.TC_07.loa_acceptance_hours, data.TC_07.loa_acceptance_mins);

    await dashboardCFP.otherDetails(data.TC_07.index, data.TC_07.Settlement_Price);

    await dashboardCFP.commentBox(data.TC_07.query_Box);

    await dashboardCFP.ceilingBaseReturn(data.TC_07.Ceiling_Base_Return, data.TC_07.Ceiling_Base_Return_value);

    await dashboardCFP.selectResponder(data.TC_07.multiple_responder, data.responder);

    await dashboardCFP.custom_Guests(data.TC_07.custom_Guests);

    await dashboardCFP.remarks(data.TC_07.remarks);

});

Then('Call for Proposal CFP should be Published successfully as per import case seven', async function () {

    await dashboardCFP.publish();

    console.log("--------------------CFP has been created and Published Successfully-----------------");

    //CFP = dashboardCFP.CFP_Num;
    global.cfpNumber = dashboardCFP.CFP_Num;

    console.log("Global CFP :" + global.cfpNumber);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 2
//-------------------------------------------------------------------------------------------------------------------------
Given('User navigate to the Application and logged in as a discom user as Responder as per import case seven', async function () {

    console.log("-----------------------------------------RESPONDER-----------------------------------------");
    await login.login(data.user2, data.user2_password);

});


Given('User started placing Response to the CFP as per import case seven', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    await pageFixture.page.waitForTimeout(90 * 1000);

});


Then('Response CFP should be Placed successfully as per import case seven', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.TC_07.minQuantumValue1, data.TC_07.ReturnValue1);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.minQuantumValue1);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue1);

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 3
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as Responder two as per import case seven', async function () {

    // login = new Login(pageFixture.page);
    console.log("-----------------------------------------RESPONDER 2-----------------------------------------");
    await login.login(data.user3, data.user3_password);

});



Given('Responder two started placing Response to the CFP as per import case seven', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    // await pageFixture.page.waitForTimeout(90 * 1000);

});



Then('Responder two Response CFP should be Placed successfully as per import case seven', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.TC_07.minQuantumValue2, data.TC_07.ReturnValue2);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.minQuantumValue2);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue2);


});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 4
//-------------------------------------------------------------------------------------------------------------------------

Given('User navigate to the Application and logged in as a discom user as Responder three as per import case seven', async function () {
    // login = new Login(pageFixture.page);
    console.log("-----------------------------------------RESPONDER 3-----------------------------------------");
    await login.login(data.user4, data.user4_password);

});


Given('Responder three started placing Response to the CFP as per import case seven', { timeout: 120 * 1000 }, async function () {

    await home.clickCallForPropsal();

    await dashboardCFP.clickresponder();

    // await pageFixture.page.waitForTimeout(90 * 1000);

});



Then('Responder three Response CFP should be Placed successfully as per import case seven', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.place_Respond(cfpNumber, data.TC_07.minQuantumValue3, data.TC_07.ReturnValue3);

    await dashboardCFP.view_Respond(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.minQuantumValue3);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue3);


});




//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 5
//-------------------------------------------------------------------------------------------------------------------------

Given('User started generating the award and generating the LOA from initiator side as per import case seven', { timeout: 1200000 }, async function () {

    await home.clickCallForPropsal();

    // //wait time for 15 minutes 
    await pageFixture.page.waitForTimeout(885000);

    console.log("Wait time is over Awarding CFP has started......");

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.generateAward();

});


Then('Awarding and Generate LOA should be successfull as per import case seven', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await dashboardCFP.initiatedFeed(cfpNumber);

    await dashboardCFP.energycalculation_initiator(DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.Minimum_QuantumValue);

    await dashboardCFP.energycalculation_responder(DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue1);

    await dashboardCFP.generateLOA(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue1, data.TC_07.Settlement_Price, data.TC_07.loa_issuance_mins);

    console.log("--------------------Awarding and LOA has generated Successfully-----------------");

    console.log("Initiator Uploaded the LOA documents successfully. \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});

//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 6
//-------------------------------------------------------------------------------------------------------------------------


Given('User started Uploading the documents from Responder Side as per import case seven', async function () {

    await loaManagement.loaGeneration();

});



Then('Responder Uploading the documents should be successfull as per import case seven', async function () {

    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.uploadDocument(cfpNumber, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.Quantum_value, DashboardCFP.exp_start_date, DashboardCFP.exp_end_date, data.TC_07.exp_start_time, data.TC_07.exp_end_time, data.TC_07.ReturnValue1, data.TC_07.Settlement_Price, data.TC_07.loa_acceptance_mins);

    console.log("Responder Uploaded the documents successfully  \n <<<<<<<<<<<LOA has been uploaded successfully.>>>>>>>>>>>>>>");

});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 7
//-------------------------------------------------------------------------------------------------------------------------
Then('Format D should be successfully Generated from initiator side as per import case seven', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action(cfpNumber);

    await loaManagement.formatD(data.TC_07.GTAM, data.TC_07.source_of_generation, data.TC_07.RPO, data.TC_07.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.Quantum_value);



});


//-------------------------------------------------------------------------------------------------------------------------
//@                                                     Scenario 8
//-------------------------------------------------------------------------------------------------------------------------

Then('Format D should be successfully Generated from Responder side as per import case seven', async function () {

    //cfp carried from initial Step definition
    const cfpNumber = global.cfpNumber;
    console.log("Global CFP: " + cfpNumber);

    await loaManagement.loaGeneration();

    await loaManagement.action_FormatD(cfpNumber);

    await loaManagement.formatD(data.TC_07.GTAM, data.TC_07.source_of_generation, data.TC_07.RPO, data.TC_07.TGNA, DashboardCFP.imp_start_date, DashboardCFP.imp_end_date, data.TC_07.imp_start_time, data.TC_07.imp_end_time, data.TC_07.Quantum_value);


});

