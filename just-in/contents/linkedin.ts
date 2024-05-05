import type { PlasmoCSConfig } from "plasmo"

import scan = chrome.documentScan.scan

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyCIa2mJ6D8s2l5nUqtuHT4ijUoexTb6odM");
// document.addEventListener('DOMContentLoaded', function() {
//     var tab = document.getElementById('expandable-tab');
//
//     tab.addEventListener('click', function() {
//         tab.classList.toggle('hidden');
//     });
// });

async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
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

async function addSection() {
  let targetElement = document.querySelector(
      "#app-container > section.basic-profile-section.bg-color-background-container.pb-2.relative"
  )
  let comb = await scrapeText();
  let summary = await run("Please summarize the following in a small paragraph: " + comb);

  try {
    let data = await categories(comb);
    let newSection2 = document.createElement("section")
    newSection2.setAttribute(
        "class",
        "relative about-section bg-color-background-container p-2 pr-0 mt-1"
    )

    let affinity_string:string = '<div class="affinity-container">';
    for (var [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`)
      value = Math.round(value * 100)
      affinity_string += `
      <div class="affinity-item">
        <span class="affinity-key">${key}:</span>
        <div class="progress-circle" style="--percentage: ${value}">
          <svg viewBox="0 0 36 36">
            <path class="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke="#eee" stroke-width="2.5"/>
            <path class="circle"
              stroke-dasharray="${value}, 100"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke="deepskyblue" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span class="affinity-value">${value}%</span>
        </div>
      </div>`;
    }
    affinity_string += '</div>'
    newSection2.innerHTML = `
    <style>
  .affinity-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .affinity-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    margin: 10px;
  }
  .affinity-key {
    font-weight: bold;
    margin-bottom: 5px; /* Add space between the label and circle */
  }
  .progress-circle {
    position: relative;
    width: 60px; /* Size of the circle */
    height: 60px;
    display: flex;
    align-items: center; /* Align text in the center */
    justify-content: center; /* Center text horizontally */
  }
  .progress-circle svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .progress-circle .affinity-value {
    position: relative;
    z-index: 1; /* Ensures text is above the SVG */
    font-size: 1em; /* Larger font size */
    font-weight: bold;
  }
  .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
  }
  .circle {
    fill: none;
    stroke: #0077B5;
    stroke-width: 3.8;
    stroke-linecap: round;
  }
</style>

  
  <h1 class="text-color-text heading-large">Affinity</h1>
  <div class="summary-container mr-2">
    <div class="relative truncated-summary">
      <div class="body-small text-color-text whitespace-pre-line description" tabindex="0" role="text" dir="ltr">
        ${affinity_string}
      </div>
    </div>
  </div>`;

    targetElement.parentNode.insertBefore(newSection2, targetElement.nextSibling)
    targetElement = newSection2
  } catch(error) {
    console.error("Failed to add affinity section")
    console.error("Failed to process data:", error)
  }

  try {
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
                ${summary}
            </div>
        </div>
    </div>
  `
    // Insert the new section after the target element
    targetElement.parentNode.insertBefore(newSection, targetElement.nextSibling)
    targetElement = newSection
  } catch {
    console.error("Failed to add summary section")
  }

  try {
    let questions = await run("Based on the paragraph below, generate some point form converstation starters and whatnot: " + summary);
    document.getElementById("textBoxArea").value = questions;
  } catch(error) {
    console.error("Failed to add affinity section")
    console.error("Failed to process data:", error)
  }
}

window.addEventListener("load", () => {
  scrapeText();
    // document.body.style.background = "lightpink"
    // saveText(test_dict)
    // console.log(readText("theycallmeswift"))
  addSection();
})
