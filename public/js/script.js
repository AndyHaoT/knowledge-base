function HideError() {
    let errorMsg = document.getElementById("error-msg");
    if (errorMsg != null)
        errorMsg.remove();
}

function ConfirmPw() {
    let pw = document.getElementById("signup-pw");
    let confirmPw = document.getElementById("signup-confirm-pw");
    if(pw.value != confirmPw.value) {
        confirmPw.setCustomValidity("Passwords Don't Match");
    } else {
        confirmPw.setCustomValidity('');
    }
    console.log("d")
}