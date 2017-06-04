function loadScript(url) {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.charset = 'utf-8';
    elem.addEventListener('load', doCallback, false);
    elem.src = url;
    document.getElementsByTagName('head')[0].appendChild(elem);
}

function url(file) {
    console.log(file);
    return chrome.extension.getURL(file);
}

function doCallback() {
    console.log("doCallback");
}

loadScript(url('popup.js'));