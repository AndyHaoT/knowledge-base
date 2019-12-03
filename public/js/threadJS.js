function validateThread() {
    let subject = document.querySelector("input[name=subject]")
    let message = document.querySelector("textarea[name=message]")
    if(subject.value.length > 0 && message.value.length > 0) { 
        document.getElementById('submit_btn').disabled = false;
    } else { 
        document.getElementById('submit_btn').disabled = true;
    }
}