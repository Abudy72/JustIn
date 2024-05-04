function run(){
  var url = document.URL
  if(url.includes('linkedin')){

    var body = document.getElementsByTagName('body')[0];
    //body.innerHTML = '';
    var iFrame  = document.createElement("iframe");
    /*iFrame.style.height = "300px";
    iFrame.style.width = "100%";
    iFrame.style.position = "fixed";
    iFrame.style.bottom = "0";
    iFrame.style.left = "0";
    iFrame.style.border = "none";
    iFrame.style.zIndex = "1000";*/
    iFrame.src = chrome.runtime.getURL("hullo.html");
    document.body.appendChild(iFrame);

  }
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