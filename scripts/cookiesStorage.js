function createCookie() {
    let username = "John Doe";
    let timeNow = new Date();

    timeNow.setTime(timeNow.getTime() + (5 * 24 * 60 * 1000)); // expires in 5 days

    let expires = "expires=" + timeNow.toUTCString();

    let value = "aSDk123kmakmakmsd1"

    document.cookie = `sessionToken=${value}; ${expires};  path=/`;

    console.log(document.cookie);
}