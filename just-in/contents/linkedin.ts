import type { PlasmoCSConfig } from "plasmo"

import scan = chrome.documentScan.scan

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

async function categories(text) {
  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    })

    if (!response.ok) {
      throw new Error("Network response was not ok.")
    }

    const data = await response.json() // Assuming the server returns JSON
    console.log("Success:", data)
    return data // This can now be used when calling sendData
  } catch (error) {
    console.error("Error:", error)
    throw error // Rethrow to allow caller to handle it
  }
}

async function scrapeText() {
  let combined_text: string = "";
  function selectText(selector: string) {
    const elements = document.querySelectorAll(selector)
    if (elements.length > 0) {
      elements.forEach((element) => {
        // console.log(element.innerText.trim().replace(/\s/g, " "))
        combined_text += element.innerText.trim().replace(/\s/g, " ");
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
  // skills
  console.log("skills")
  selectText(
      "#app-container > section.bg-color-background-container.py-2.pl-2.mt-1.collapsible-list-container.skills-container.relative > ol > li"
  )
  return combined_text;
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
  <style>
  body {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
ul {
    list-style-type: none;
    padding: 5px;
    margin: 0;
}
li {
    display: inline;
    margin-right: 10px; 
}
button {
    font-size: 20px;
    margin-left: 70px;
    margin-top: 10px;
    background-color: #D9D9D9;
    border: 0px;
    border-radius: 15px;
}
.divider {
    border-bottom: 1px solid red;
    padding: 0px;
    margin: 0px;
}
#OuterContainer {
    width: 445px;
    max-width: auto;
    max-height: auto;
    overflow: auto;
    background-color: #8ab0e2;
    border: 1px solid black;
    float: right;
}
#mainTitle {
    padding: 10px;
    font-weight: bold;
    background-color: #2667BC;
    text-align: center;
    font-size: 35px;

}
.subSections {
    padding-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid white;
    padding-bottom: 5px;
}
.subHeading {
    padding-top: 5px;
    font-size: 25px;
    font-weight: bold;
}
.subSections p {
    padding-right: 5px;
}
.arrow-box {
    float: right;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: blue;
    color: white;
    padding: 10px;
    cursor: pointer;
}

  </style>
  <div id="OuterContainer">
  <div id="mainTitle">
      <div class="arrow-box" id="toggleArrow">&#x3c;</div> 
      <div>JustIn</div>
  </div>
  <div class="subSections">
      <div class="subHeading">Affinity Scores:</div>
      <ul>
          <li>Category A: 97%</li>
          <li>Category B: 27%</li>
          <li>Category C: 17%</li>
      </ul>
  </div>

  <div class="subSections">
      <div class="subHeading">Summary:</div>
      <p id="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
  </div>
      
  <div class="subSections">
      <div class="subHeading">Notes: </div>
      <!--Herees where the TinyMCE goes.-->
      <p id="notes">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>

  <div class="subSections">
      <button>Suggestion1</button>
      <button>Suggestion2</button>
      <p id="geminiResp">Choose a Suggested topic!</p>
  </div>
  </div>
`
  // Insert the new section after the target element
  var cats = newSection.getElementsByTagName("li")
  ;(async () => {
    try {
      var counter = 0
      
      var data = await categories(await scrapeText())
      for (var [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`)
        value = Math.round(value * 100)
        cats[counter].textContent = `${key}: ${value}%`
        counter++
      }
    } catch (error) {
      console.error("Failed to process data:", error)
    }
  })()
  targetElement.parentNode.insertBefore(newSection, targetElement.nextSibling)
}

window.addEventListener("load", () => {
  scrapeText().then(() => {
    document.body.style.background = "lightpink"
    saveText(test_dict)
    console.log(readText("theycallmeswift"))
  })
  addSection()
})
