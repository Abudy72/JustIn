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

window.addEventListener("load", () => {
  scrapeText().then(() => {
    document.body.style.background = "pink"
    saveText(test_dict)
    console.log(readText("theycallmeswift"))
  })
})
