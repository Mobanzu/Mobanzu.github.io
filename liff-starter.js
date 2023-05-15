window.onload = function() {
    const useNodeJS = false; 
    const defaultLiffId = "1656652460-LGKR2XXJ";
    let myLiffId = "1656652460-LGKR2XXJ";

    if (useNodeJS) {
        fetch('/liff/send-id', {
            headers: {
                "referer": "https://pixiv.net/en/"
            }
        })
        .then(function(reqResponse) {
            return reqResponse.json();
        })
        .then(function(jsonResponse) {
            myLiffId = jsonResponse.id;
            initializeLiff(myLiffId);
        })
        .catch(function(error) {
            console.log(error.message, error.code);
        });
    } else {
        myLiffId = defaultLiffId;
        initializeLiff(myLiffId);
    }
};

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            sendLiff();
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendLiff(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('text'),
            sentBy: {
                label: "もバンズ",
                iconUrl: "https://i.ibb.co/tKhLYX4/activated.gif",
                linkUrl: "https://Mo-banzu.github.io"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img'),
            sentBy: {
                label: "もバンズ",
                iconUrl: "https://i.ibb.co/tKhLYX4/activated.gif",
                linkUrl: "https://Mo-banzu.github.io"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'video') {
        prev = getParameterByName('piu');
        if(prev !== null && prev !== '') {
            dura = prev;
        } else {
            dura = "https://i.ibb.co/TTSjGpt/activity.gif";
        }
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: dura
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'audio') {
        duration = getParameterByName('duration');
        if(duration !== null && duration !== '') {
            dura = parseInt(duration);
        } else {
            dura = 60000;
        }
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: dura
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
