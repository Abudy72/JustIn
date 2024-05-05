import type { PlasmoCSConfig } from "plasmo"

import scan = chrome.documentScan.scan

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

async function scrapeText() {
  function selectText(selector) {
    const elements = document.querySelectorAll(selector)
    if (elements.length > 0) {
      elements.forEach((element) => {
        console.log(element.innerText.trim().replace(/\s/g, " "))
      })
    } else {
      console.log("No elements found with the selector: " + selector)
    }
  }
  // experiences
  console.log("experiences")
  selectText(
    "#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container.collapsed > ol > li"
  )
  // education
  console.log("education")
  selectText(
    "#app-container > section.bg-color-background-container.education-container.py-2.pl-2.mt-1.collapsible-list-container > ol > li"
  )
  // activity
  console.log("activity")
  selectText(
    "#app-container > section.activity-section.bg-color-background-container.mt-1"
  )
  // about
  console.log("about")
  selectText(
    "#app-container > section.relative.about-section.bg-color-background-container.p-2.pr-0.mt-1"
  )
}

function saveText(json_data) {
  chrome.storage.sync.set(json_data, function () {
    console.log("Data saved")
  })
}

function readText(user) {
  chrome.storage.sync.get([user], function (items) {
    console.log(items)
    return items
  })
}

let test_dict = {}
test_dict = {
  theycallmeswift: {
    name: "Mike Swift",
    position: "Software Engineer",
    company: "MLH"
  }
}

function addSection() {
  let targetElement = document.querySelector(
      "#app-container > section.basic-profile-section.bg-color-background-container.pb-2.relative"
  )
  // Create a new section element
  let newSection = document.createElement("section")
  newSection.setAttribute(
      "class",
      "relative about-section bg-color-background-container p-2 pr-0 mt-1"
  )

  // Set the HTML content
  newSection.innerHTML = `
    <h1 class="text-color-text heading-large">Summary</h1>
    <div class="summary-container mr-2">
        <div class="relative truncated-summary">
            <div class="body-small text-color-text whitespace-pre-line description" tabindex="0" role="text" dir="ltr">
                I'm Swifter – the CFO & Co-Founder of Major League Hacking (MLH) where I’ve helped build one of the largest developer communities in the world. Our community is where the next generation of technologists and founders learn the skills they need to bring their ideas to life and build their professional networks.
                I was previously named to the Forbes 30 Under 30 Education category, founded Hacker League (acquired by Intel in 2013), and was the first developer evangelist for SendGrid (IPO 2017, acquired by Twilio in 2019).
            </div>
        </div>
    </div>
`
  // Insert the new section after the target element
  targetElement.parentNode.insertBefore(newSection, targetElement.nextSibling)
}

window.addEventListener("load", () => {
  scrapeText().then(() => {
    document.body.style.background = "lightpink";
    saveText(test_dict);
    console.log(readText("theycallmeswift"));
  })
  addSection();
})