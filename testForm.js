// testForm.js

// Verify submit form with valid data and invalid data
// Created 02/11/2017

// required libraries
var webdriverio = require('webdriverio');
var should = require('should');


// a test script block or suite

describe('verify three forms with submittion ', function() {

// set timeout to 60 seconds
this.timeout(50000);
var driver = {};

// check for global browser (grunt + grunt-webdriver)
if(typeof browser === "undefined") {

    // load the driver for browser
	//Tested on Firefox and Chrome, both work well
    driver = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
    driver
	.init()
	.url("file:///C:/project/form/test.html")
	
	
	  
    } else {

      // grunt will load the browser driver

      driver = browser;

    }


// Start create test cases, set timeout to wait until page is loaded
setTimeout(function() {
	
	
// Set first name as Tony
 it('should set first name to Tony', function () {
    
    return driver
	  .setValue("#fname", "Tony")

      .getValue("#fname").then( function (e) {

        (e).should.be.equal("Tony");

        //console.log("First Name: " + e);

      });

  });

 // Set the last name using id to: Smith

  it('should set last name to Smith', function () {

    return driver.setValue("#lname", "Smith")

      .getValue("#lname").then( function (e) {

        (e).should.be.equal("Smith");

        //console.log("Last Name: " + e);

      });
	  
  });
  
  // Set the phone number using id to: 514-123-4567

  it('should set phone number to 514-123-4567', function () {

    return driver.setValue("#phone", "514-123-4567")

      .getValue("#phone").then( function (e) {

        (e).should.be.equal("514-123-4567");

        //console.log("Phone number is: " + e);

      });

  });
  
 // Submit form and wait for search results

  it('should submit form and wait for results', function () {

    return driver.click("#submit").then( function(e) {

      //console.log('Submit' + e);

      })

      .waitForVisible("#fname-submit", 1000).then(function (e) {

        //console.log('Results Found');

      });
	 

  });
  
				 
  it('should get error messages for missing all  the required fields ', function () {
  	
	return driver
	  .url("file:///C:/project/form/test.html")
	  .click("#submit").then( function(e) {
      //console.log('Submit');
      })
	.waitForVisible("#fname-error", 1000).then(function (e) {
        //console.log('Results Found');
      })
	.getText("#fname-error").then(function (e) {
        (e).should.be.equal("First name is a required field");

      })
	.getText("#lname-error").then(function (e) {

        (e).should.be.equal("Last name is a required field");

      })
    .getText("#phone-error").then(function (e) {

        (e).should.be.equal("Phone number is a required input");

      });
    });

	
//Verify various error messages	

  var errmessage = [
                    { "des":"First name should only be characters",   "eleinput":"#fname", "userinput": "May123", "text":"First name can only be characters"},
                    { "des":"Last name should only be characters",    "eleinput":"#lname", "userinput": "Lee123", "text":"Last name can only be characters"},
					{ "des":"The max length of first name should 20", "eleinput":"#fname", "userinput": "aaaaabbbbbcccccddddde", "text":"The max length of first name is 20"},
                    { "des":"The max length of last name is 20",      "eleinput":"#lname", "userinput": "fffffggggghhhhhiiiiijjj", "text":"The max length of last name is 20"},
					{ "des":"Phone input should match the phone number format", "eleinput":"#phone", "userinput": "123", "text":"Phone is incorrect"},
					
					//Verify empty field with appropriate message
					{ "des":"First name is a required field",   "eleinput":"#fname", "userinput": "", "text":"First name is a required field"},
					{ "des":"Last name is a required field",   "eleinput":"#lname", "userinput": "", "text":"Last name is a required field"},
					{ "des":"Phone number is a required input",   "eleinput":"#phone", "userinput": "", "text":"Phone number is a required input"},
                    
  
  ]
  
  errmessage.forEach(function (cherr) {
  it(cherr.des, function () {
    
	//console.log("err message " + cherr.eleinput + cherr.text);
	return driver
	     .setValue(cherr.eleinput, cherr.userinput)
		 .getValue(cherr.eleinput).then( function (e) {

        (e).should.be.equal(cherr.userinput);

        }) 
        .click("#submit").then( function(e) {
           //console.log('Submit');
        })
        .getText(cherr.eleinput + "-error").then(function (e) {
         //console.log(e);
		(e).should.be.equal(cherr.text);

        });	
         
  
  });
  
  });
 
 //Verify submit results with correct values	
 
  var correctData = [
                     {"firstName": "baby",       "lastName":"Lee",   "phoneNumber":"123-456-7890"},
					 {"firstName": "Apple",      "lastName":"BaBa",  "phoneNumber":"1234567890"},
					 {"firstName": "A",          "lastName":"B",     "phoneNumber":"012-345-6789"},
					 {"firstName": "AAAAABBBBB", "lastName":"CCCCC", "phoneNumber":"012-345-6789"}
  
  
  ] 
  
 
  correctData.forEach(function (data) {
  it("Test with correct data", function () {
    
	
	return driver
		 .url("file:///C:/project/form/test.html")
	     .setValue("#fname", data.firstName)
		 .getValue("#fname").then( function (e) {
    
         //console.log("data message " + data.firstName);	
         (e).should.be.equal(data.firstName);

        }) 
		.setValue("#lname", data.lastName)
		 .getValue("#lname").then( function (e) {
         
		 //console.log("data message " + data.lastName);
        (e).should.be.equal(data.lastName);
 
        }) 
		.setValue("#phone", data.phoneNumber)
		 .getValue("#phone").then( function (e) {

        (e).should.be.equal(data.phoneNumber);

        }) 
        .click("#submit").then( function(e) {
           //console.log('Submit');
        })
        .getText("#fname-submit").then(function (e) {
        (e).should.be.equal(data.firstName);

        })	
		.getText("#lname-submit").then(function (e) {
        (e).should.be.equal(data.lastName);

        })
        .getText("#phone-submit").then(function (e) {
        (e).should.be.equal(data.phoneNumber);

        });			
         
  
  });
  
  });
 

 
run();
}, 10000)

  // a "hook" to run after all tests in this block

	after(function(done) {

    if(typeof browser === "undefined") {

      driver.end(done);

    } else {

      done();

    }

  });

});