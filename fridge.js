var newAccountInd = 0; //array index

var newUserObject1 = new Object();

//new account object
function account(u, p){
    this.username = u;
    this.password = p;
    this.temperature = 0;
}

var allAccounts = [new account(), new account()];
var loggedOnAccount = null;


//NEW MULTI DIMENSIONAL ARRAY TO KEEP TRACK OF EACH POSSIBLE FOOD IN THE FRIDGE

//INDEX 0 = RFID NUMBER
//INDEX 1 = FOOD NAME
//INDEX 2 = COUNT
var foods = [
  {id:'6adda889', name:'soymilk', count:0},
  {id:'36ddb979', name:'sriracha', count:0},
  {id:'8added8b', name:'pineapple', count:0},
  {id:'f6c2b979', name:'hummus', count:0},
  {id:'c741ba79', name:'applesauce', count:0},
  {id:'7279ba79', name:'rosé', count:0},
  {id:'0752ba79', name:'salsa', count:0},
];

// LOGIN PAGE - ADD A NEW USER BUTTON
var addUserButton = document.getElementById("newUserButton");
var show_newUser = function(){
    document.getElementById("newUser").hidden = false;
    document.getElementById("loginPage").hidden = true;

}
addUserButton.addEventListener("click", show_newUser);

// NEW USER PAGE - CREATE NEW USER BUTTON
var newUserButton = document.getElementById("createNewUserButton");
var show_userConfirm = function(){
    //MAKE VARIABLES ACCORDING TO INPUT VALUES
    var username = document.getElementById("desiredUsername").value;
    var password = document.getElementById("desiredPassword").value;
    var password2 = document.getElementById("confirmDesiredPassword").value;
    var usernameAlreadyTaken = false;

    for(i = 0; i<allAccounts.length; i++){
        if(allAccounts[i].username == username){
            usernameAlreadyTaken = true;
            document.getElementById("usernameTaken").hidden = false;
        }
        else {
            document.getElementById("usernameTaken").hidden = true;
        }
    }

    if(password === password2 && usernameAlreadyTaken === false){
        allAccounts.push(new account()); //add new account object to array

        //show confirmed new user page, hide make account page
        document.getElementById("userConfirm").hidden = false;
        document.getElementById("newUser").hidden = true;

        //hide error messages
        document.getElementById("mismatchPassword").hidden = true;
        document.getElementById("usernameTaken").hidden = true;

        //MAKE NEW ACCOUNT OBJECT
        var makeAccount = new account();
        makeAccount.doorStatus = "closed";
        makeAccount.username = username;
        makeAccount.password = password;
        //makeAccount.phoneNumber = phoneNum;
        //makeAccount.ID = i_d;

        allAccounts[newAccountInd] = makeAccount;

        //DISPLAY NEW ACCOUNT USERNAME AND PASSWORD IN NEW PAGE
        document.getElementById("displayInfo").innerHTML = "Your username: " + allAccounts[newAccountInd].username + " | Your password: " + allAccounts[newAccountInd].password;
        newAccountInd ++;
    }

    //ERROR MESSAGES

    else if ((password != password2) && usernameAlreadyTaken){  //if username is already taken AND passwords don't match
        document.getElementById("usernameTaken").hidden = false;
        document.getElementById("mismatchPassword").hidden = false;
    }
    else if (password != password2){ //if passwords don't match
        document.getElementById("mismatchPassword").hidden = false;
        document.getElementById("usernameTaken").hidden = true;
    }
    else if (usernameAlreadyTaken){ //if username is already taken
        document.getElementById("usernameTaken").hidden = false;
        document.getElementById("mismatchPassword").hidden = true;
    }


    //var phoneNum = document.getElementById("phoneNumber").value;
    //var i_d = document.getElementById("openerID").value;

}
newUserButton.addEventListener("click", show_userConfirm);



// NEW USER CONFIRMATION PAGE - RETURN TO LOGIN PAGE BUTTON
var returnToLoginButton = document.getElementById("returnToLoginButton");
var show_loginPage = function(){
    document.getElementById("closedImage").hidden = false;
    document.getElementById("openedImage").hidden = true;
    loggedOnAccount = null; //no active account
    //reset entry fields
    document.getElementById("desiredUsername").value = null;
    document.getElementById("desiredPassword").value = null;
    document.getElementById("confirmDesiredPassword").value = null;

    document.getElementById("loginPage").hidden = false;
    document.getElementById("homePage").hidden = true;
    document.getElementById("newUser").hidden = true;
    document.getElementById("userConfirm").hidden = true;
    document.getElementById("forgotPassword").hidden = true;
    document.getElementById("emailRecovery").hidden = true;
}
returnToLoginButton.addEventListener("click", show_loginPage);


//
//
//
//
//
// LOGIN PAGE - LOGIN BUTTON
var loginButton = document.getElementById("loginButton");
//SHOW HOMEPAGE : RESET EVERY BUTTON/DISPLAY TO THE SETTINGS OF EACH SPECIFIC ACCOUNT!!!
var show_homePage = function(){

    //IF INPUT USERNAME AND PASSWORD MATCH ACCOUNT'S, THEN GO TO HOMEPAGE
    var correctAccount = 0;

    //CHECK FOR USERNAME MATCH IN THE allAccounts ARRAY; SET correctAccount TO THE INDEX OF OBJECT THAT MATCHES USERNAME
    for(i = 0; i<allAccounts.length; i++){
        if(allAccounts[i].username == document.getElementById("username").value){
            correctAccount = i;

        }
        else{
            document.getElementById("error").hidden = false;
        }
    }

    //CHECK USERNAME AND PASSWORD MATCH
    if(allAccounts[correctAccount].username == document.getElementById("username").value &&
       allAccounts[correctAccount].password == document.getElementById("pass").value){


    //SHOW AND HIDE ALL THE STUFF NECESSARY
        document.getElementById("closedImage").hidden = true;
        document.getElementById("openedImage").hidden = false;
        document.getElementById("groceryList").hidden = true;
        document.getElementById("inventory").hidden = false;
        document.getElementById("recentlyRemoved").hidden = true;
        document.getElementById("homePage").hidden = false;
        document.getElementById("loginPage").hidden = true;
        document.getElementById("error").hidden = true;


        loggedOnAccount = allAccounts[correctAccount]; //SET LOGGEDONACCOUNT to THE MATCHED ACCOUNT
        document.getElementById("welcomeUser").innerHTML = loggedOnAccount.username;
    }
    //DO NOT ALLOW LOGIN:
    //PASSWORD/USERNAME IS WRONG
    //ERROR MESSAGE IF PASSWORD/USERNAME IS WRONG
    else{
            document.getElementById("error").hidden = false;
    }


}
loginButton.addEventListener("click", show_homePage);



// LOGIN PAGE - FORGOT MY PASSWORD BUTTON
var forgotPasswordButton = document.getElementById("forgotPasswordButton");
var show_forgotPassword = function(){

    document.getElementById("forgotPassword").hidden = false;
    document.getElementById("loginPage").hidden = true;
}
forgotPasswordButton.addEventListener("click", show_forgotPassword);



// FORGOT PASSWORD PAGE - RETRIEVE PASSWORD BUTTON
var retrievePasswordButton = document.getElementById("retrievePasswordButton");
var show_emailRecoveryConfirm = function(){

    var correctAccount = 0;
    var found = false;
    //CHECK FOR USERNAME MATCH IN THE allAccounts ARRAY; SET correctAccount TO THE INDEX OF OBJECT THAT MATCHES USERNAME
    for(i = 0; i<allAccounts.length; i++){
        if(allAccounts[i].username === document.getElementById("userInfo").value){
            correctAccount = i;
            found = true;
        }
    }
    if (found){ //if an account's username matched the userInfo input
            document.getElementById("recoveredPasswordMessage").innerHTML = "The password for the account, " + allAccounts[correctAccount].username + " is: " + allAccounts[correctAccount].password;
    }
    else {//if there was no username that matched the userInfo input
        document.getElementById("recoveredPasswordMessage").innerHTML = "ACCOUNT NOT FOUND!";
    }

    document.getElementById("emailRecovery").hidden = false;
    document.getElementById("forgotPassword").hidden = true;
}
retrievePasswordButton.addEventListener("click", show_emailRecoveryConfirm);



// PASSWORD RECOVERY CONFIRMATION PAGE - RETURN TO LOGIN PAGE BUTTON
var returnToLoginFromCreation = document.getElementById("returnToLoginFromCreation");
returnToLoginFromCreation.addEventListener("click", show_loginPage);


//LOGOUT BUTTON
var returnToLoginFromHome = document.getElementById("returnToLoginFromHome");
returnToLoginFromHome.addEventListener("click", show_loginPage);



//SHOW INVENTORY PAGE
var invButton = document.getElementById("invButton");
var show_inventory = function(){

    document.getElementById("groceryList").hidden = true;
    document.getElementById("inventory").hidden = false;
    document.getElementById("recentlyRemoved").hidden = true;
}
invButton.addEventListener("click", show_inventory);




//RECENTLY REMOVED ITEMS PAGE
var recRemButton = document.getElementById("recRemButton");
var show_recentlyRemoved = function(){

    document.getElementById("groceryList").hidden = true;
    document.getElementById("inventory").hidden = true;
    document.getElementById("recentlyRemoved").hidden = false;
}
recRemButton.addEventListener("click", show_recentlyRemoved);




//GROCERY LIST PAGE
var groceryListButton = document.getElementById("grocListButton");
var show_groceryList = function(){

    document.getElementById("groceryList").hidden = false;
    document.getElementById("inventory").hidden = true;
    document.getElementById("recentlyRemoved").hidden = true;
}
groceryListButton.addEventListener("click", show_groceryList);




/*
*
* FOLLOWING IS CODE USED TO SIGN INTO PARTICLE IN ORDER TO LATER GET INFO FROM LASER_LASER
*
*/


// Create an instance of the Particle.io library and a variable to contain
// the access token and login/password/device
var particle = new Particle();
var token;

var login = '';
var password = '';
var deviceId = '';  // Comes from the number in the particle.io Console


// Call back function for login success/failure
function loginSuccess(data) {
  console.log('API call completed on promise resolve: ', data.body.access_token);
  token = data.body.access_token;
  setTimeout(checkForNewRFID, 1500);
}

function loginError(error) {
  console.log('API call completed on promise fail: ', error);
}

// Try to login
particle.login({username:login, password:password}).then(loginSuccess, loginError);

function callSuccess(data) {
  console.log('Function called succesfully:', data);
}

function callFailure(error) {
  console.log('An error occurred:', error);
}


/*
*
* FOLLOWING IS CODE TO RETRIEVE THE RFID NUMBER FROM THE SCANNER
*
*/


var foodIndex = 0;
var foodToBeAdded = '';
var foodName = '';

function checkForNewRFID(){
  particle.getEventStream({deviceId:deviceId, name:'newRFID', auth:token}).then(function(stream){
    stream.on('newRFID', function(data){
      for(i = 0; i < foods.length; i++) {
        if(foods[i].id === data.data){
          foodIndex = i;
          console.log(foods[i].name);
          foods[i].count++;
          if(foods[i].count % 2 === 0){ //MEANS COUNT IS EVEN
            foodName = foods[foodIndex].name;
            recentlyRemoved();
          }
          else{
            foodName = foods[foodIndex].name;
            addFoodToFridge();
          }
        }
      }
    });
  });
}

var toRemove = '';
var currentFoodName = '';

/*
*
* REMOVES FOOD ITEM FROM RECENTLY REMOVED PAGE AND ADDS ITEMS TO THE INVENTORY
*
*/
function addFoodToFridge(){
  //FIRST REMOVE THE ITEM FROM THE RECENTLY REMOVED LIST
  $("#"+foodName+"Removed").remove();
  //NEXT ADD THE ITEM TO THE INVENTORY LIST
  $("<li id='" + foodName + "'>" + foodName + "</li>").appendTo(document.getElementById("fridgeList"));
}

/*
*
* REMOVE FOOD ITEM FROM INVENTORY AND PUT ON RECENTLY REMOVED PAGE
*
*/
function recentlyRemoved(){
  //FIRST REMOVE THE ITEM FROM THE INVENTORY LIST
  $("#"+foodName).remove();
  //NEXT ADD THE ITEM TO THE RECENTLY REMOVED LIST
  $("<li id='" + foodName + "Removed'>" + foodName + "<input type='button' id='" + foodName + "RemovedButton' value='+'/></li>").appendTo(document.getElementById("removedList"));
  //ADD AN EVENT LISTENER TO THE NEWLY ADDED BUTTON
  document.getElementById(foodName + "RemovedButton").addEventListener("click", addToGroceryList);
}

/*
*
* REMOVE FOOD ITEM FROM RECENTLY REMOVED PAGE AND ADD TO GROCERY LIST PAGE
*
*/
function addToGroceryList(data){
  //FIRST REMOVE THE ITEM FROM THE RECENTLY REMOVED LIST
  toRemove = data.target.id.replace('Button', '');
  currentFoodName = data.target.id.replace('RemovedButton', '');
  $("#"+toRemove).remove();
  //NEXT ADD THE ITEM TO THE GROCERY LIST
  $("<li id='" + currentFoodName + "Grocery'>" + currentFoodName + "<input type='button' id='" + currentFoodName + "GroceryButton' value='-'/></li>").appendTo(document.getElementById("grocery"));
  //ADD AN EVENT LISTENER TO THE NEWLY ADDED BUTTON
  document.getElementById(currentFoodName + "GroceryButton").addEventListener("click", deleteFromGroceryList);
}

/*
*
* REMOVE FOOD ITEM FROM GROCERY LIST PAGE
*
*/
function deleteFromGroceryList(data){
  currentFoodName = data.target.id.replace('GroceryButton', '');
  //REMOVE THE ITEM FROM THE GROCERY LIST
  $("#"+currentFoodName+"Grocery").remove();
}
