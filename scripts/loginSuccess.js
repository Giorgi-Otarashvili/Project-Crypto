let sessionToken = sessionStorage.getItem('sessionToken');
let usersData = localStorage.getItem('usersData');
usersData = JSON.parse(usersData);
console.log(sessionToken)
let welcomeMessage = document.querySelector('.welcome_message');
console.log(welcomeMessage);

let loggedInUserData = {};

let documentCookie = document.cookie;

if (documentCookie.length > 0) {
    let indexOfEqualSign = documentCookie.indexOf('=');
    sessionToken = documentCookie.slice(indexOfEqualSign + 1);
}

let resultText = document.getElementById("resultLogin");
console.log(resultText);

if (sessionToken) {
    // resultText.innerHTML = "Login Success";
    
    for (let user of usersData) {
        console.log(user.sessionToken ,sessionToken)
        if (user.sessionToken === sessionToken) {
            loggedInUserData = user;
        }
    }

 
    console.log(loggedInUserData)

    welcomeMessage.innerHTML = `Welcome ${loggedInUserData.firstName} ${loggedInUserData.lastName}. <br> Username : ${loggedInUserData.username} <br>
    <p class="subscription_p">You have 1 month free subscription for Crypto.com</p>
`;



    // welcomeMessage.style.top = "15%"
    // welcomeMessage.style.marginLeft = "15px"
    // welcomeMessage.style.position = "absolute"
    welcomeMessage.style.color = "#25f605"
    welcomeMessage.style.fontFamily = "'Roboto Slab', serif"
} else {
    window.location.href = 'loginform.html';


}
