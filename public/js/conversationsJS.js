function sendMessage(){
    text_area = document.getElementsByTagName("textarea")[0]
    if(text_area.value.length > 0) { 
        document.getElementById('msg_btn').disabled = false; 
    } else { 
        document.getElementById('msg_btn').disabled = true;
    }
}

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}

function getMessagesFromThread(thisObj, thread_id, message_user) {  
    document.getElementById('msg_btn').setAttribute('onclick','addMessage(' + thread_id + ',' + message_user + ')')
    let activeTab = document.querySelector('.user_active')
    if(activeTab != null) activeTab.className = 'user'
    thisObj.className = 'user_active'
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const list = document.querySelector('.message_list')
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            const allMsgs = JSON.parse(this.responseText).allmessages
            let lastDate = null
            let msgP,msgSpan,msgDiv,msgImg,msgInnerDiv,msgInnerSpan,msgInnerSpan2,msgInnerP
            allMsgs.forEach(m => {
                if (m.date != lastDate) {
                    lastDate = m.date
                    msgP = document.createElement('p')
                    msgSpan = document.createElement('span')
                    msgSpan.textContent = lastDate
                    msgP.appendChild(msgSpan)
                    list.appendChild(msgP)
                }
                // div tag
                msgDiv = document.createElement('div')
                msgDiv.classList.add('content_photo')
                // img tag
                msgImg = document.createElement('img')
                msgImg.src = "/test.jpg"
                msgImg.alt = "profile image"
                msgDiv.appendChild(msgImg)
                // div tag for msg
                msgInnerDiv = document.createElement('div')
                msgInnerDiv.classList.add('content')
                // span tag for name
                msgInnerSpan = document.createElement('span')
                msgInnerSpan.textContent = m.user_name + decodeEntities('&nbsp;&nbsp;&#8226;')
                msgInnerDiv.appendChild(msgInnerSpan)
                // span tag for time
                msgInnerSpan2 = document.createElement('span')
                msgInnerSpan2.classList.add('message_time')
                msgInnerSpan2.textContent = m.time
                msgInnerDiv.append(msgInnerSpan2)
                // p tag for content
                msgInnerP = document.createElement('p')
                msgInnerP.textContent = m.message_content
                msgInnerDiv.appendChild(msgInnerP)

                msgDiv.appendChild(msgInnerDiv)
                list.appendChild(msgDiv)
            })
            let element = document.querySelector(".message_list");
            element.scrollTop = element.scrollHeight;

        }
    };
    xhttp.open("GET", "/conversation/"+thread_id, true);
    xhttp.send();
}

function addMessage(thread_id, message_user) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const list = document.querySelector('.message_list')
            const oneMsg = JSON.parse(this.responseText).onemessage[0]
            let allDates = document.querySelectorAll('.message_list p span')
            let lastDate = allDates[allDates.length-1].textContent
            let msgP,msgSpan,msgDiv,msgImg,msgInnerDiv,msgInnerSpan,msgInnerSpan2,msgInnerP
            console.log(oneMsg.date)
            console.log(oneMsg.date)
            if (oneMsg.date != lastDate) {
                lastDate = oneMsg.date
                msgP = document.createElement('p')
                msgSpan = document.createElement('span')
                msgSpan.textContent = lastDate
                msgP.appendChild(msgSpan)
                list.appendChild(msgP)
            }
            // div tag
            msgDiv = document.createElement('div')
            msgDiv.classList.add('content_photo')
            // img tag
            msgImg = document.createElement('img')
            msgImg.src = "/test.jpg"
            msgImg.alt = "profile image"
            msgDiv.appendChild(msgImg)
            // div tag for msg
            msgInnerDiv = document.createElement('div')
            msgInnerDiv.classList.add('content')
            // span tag for name
            msgInnerSpan = document.createElement('span')
            msgInnerSpan.textContent = oneMsg.user_name + decodeEntities('&nbsp;&nbsp;&#8226;')
            msgInnerDiv.appendChild(msgInnerSpan)
            // span tag for time
            msgInnerSpan2 = document.createElement('span')
            msgInnerSpan2.classList.add('message_time')
            msgInnerSpan2.textContent = oneMsg.time
            msgInnerDiv.append(msgInnerSpan2)
            // p tag for content
            msgInnerP = document.createElement('p')
            msgInnerP.textContent = oneMsg.message_content
            msgInnerDiv.appendChild(msgInnerP)

            msgDiv.appendChild(msgInnerDiv)
            list.appendChild(msgDiv)
            let element = document.querySelector(".message_list");
            element.scrollTop = element.scrollHeight;
            document.querySelector('textarea[name=message').value = "";
        }
    };
    let message = document.querySelector('textarea[name=message').value
    xhttp.open("POST", "/conversation/"+thread_id+"/post/"+message_user+"/message/"+message, true);
    xhttp.send();
}

let element = document.querySelector(".message_list");
element.scrollTop = element.scrollHeight;

let first_user = document.querySelector('.user');
first_user.click();
first_user.focus();
