var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery.min.js');
(document.head||document.documentElement).appendChild(j);
j.onload = function() {
    j.parentNode.removeChild(j);
};
var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};