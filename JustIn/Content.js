function run(){
  var url = document.URL
  if(url.includes('linkedin') && url.includes('/in')){

    //var body = document.getElementsByTagName('body')[0];
    //body.innerHTML = '';
    var sections = document.getElementsByTagName("section");
    var iFrame  = document.createElement("iframe");
    /*iFrame.style.height = "300px";
    iFrame.style.width = "100%";
    iFrame.style.position = "fixed";
    iFrame.style.bottom = "0";
    iFrame.style.left = "0";
    iFrame.style.border = "none";
    iFrame.style.zIndex = "1000";*/
    iFrame.src = chrome.runtime.getURL("hullo.html");
    document.getElementsByClassName("pv-profile-info-section artdeco-card p4 mb2")[0].appendChild(iFrame);
    for(let i = 0; i<sections.length; i++){
      //sections[i].innerHTML = iFrame;
      console.log(sections[i]);
    }
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