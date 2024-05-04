function run(){
  console.log(document.URL);
  var iFrame  = document.createElement("iframe");
  iframe.style.height = "300px";
  iframe.style.width = "100%";
  iframe.style.position = "fixed";
  iframe.style.bottom = "0";
  iframe.style.left = "0";
  iframe.style.border = "none";
  iframe.style.zIndex = "1000";
  iFrame.src  = chrome.runtime.getURL("hullo.html");
  document.body.appendChild (iframe);
}

window.onload = (e) => {  
  run();
}
window.onclick = (e) => {  
  run();
}
window.onscroll = (e) => {
  run();
}
