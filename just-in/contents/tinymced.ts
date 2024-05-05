import type { PlasmoCSConfig } from "plasmo"
import scan = chrome.documentScan.scan

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

let openedFileHandle = null;

async function getFile() {
    const [fileHandle] = await window.showOpenFilePicker();
    openedFileHandle = fileHandle;
    const file = await fileHandle.getFile();
    const text = await file.text();
    return text;
}

async function saveFile(content) {
    const blob = new Blob([content], { type: "text/plain" });
    const newHandle = await window.showSaveFilePicker();
    const writableStream = await newHandle.createWritable();
    await writableStream.write(blob);
    await writableStream.close();
}

async function saveFileNoPrompt(content) {
    try {
        if (!openedFileHandle) {
            throw new Error("No file opened to save");
        }
        const writable = await openedFileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    } catch (err) {
        console.error("Error saving file: ", err);
    }
}

async function addSection() {
    // const handleFileOpen = async () => {
    //     const content = await getFile();
    //     setFileContent(content);
    // };
    //

    let targetElement = document.querySelector(
        "#app-container > section.basic-profile-section.bg-color-background-container.pb-2.relative"
    )

  // Create a new script element
  let script = document.createElement("script")
  // Set the source attribute to the TinyMCE script URL
  script.src = `https://cdn.tiny.cloud/1/${process.env.VITE_TINYMCE_API_KEY}/tinymce/7/tinymce.min.js`
  // Set the referrerpolicy attribute
  script.referrerPolicy = "origin"
  // Append the script element to the head of the document
  document.head.appendChild(script)

  let newSection = document.createElement("section")
  newSection.setAttribute(
    "class",
    "relative about-section bg-color-background-container p-2 pr-0 mt-1"
  )
  // Set the HTML content
  newSection.innerHTML = `
    <h1 class="text-color-text heading-large">Notes</h1>
    <script>
  tinymce.init({
    selector: 'textarea',
    plugins: [
              "preview",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "code",
              "help",
              "wordcount",
            ],
    toolbar: "undo redo | insertdatetime |" +
              "removeformat searchreplace | code visualblocks preview fullscreen  | wordcount | help",
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ]
  });
    </script>
    <textarea id="textBoxArea">
      Welcome to TinyMCE!
    </textarea>
     <div>
        <div>
          <button id="Open" class="btn-primary btn-sm">
            Open File
          </button>
        </div>
        <div>
          <button id="SaveAs" class="btn-secondary-emphasis btn-sm flex items-center inmail-cta ml-1 px-2 py-0">
            Save As
          </button>
          <button id = "Save" class="btn-secondary-emphasis btn-sm flex items-center inmail-cta ml-1 px-2 py-0">
            Save
          </button>
        </div>
      </div>
    `
  // Insert the new section after the target element
  targetElement.parentNode.insertBefore(newSection, targetElement.nextSibling)
    document.getElementById("Open").addEventListener('click', async function () {
        console.log("hello");
        const fileContent = await getFile();
        document.getElementById("textBoxArea").value = fileContent;
    });
    document.getElementById("SaveAs").addEventListener('click', function() {
        console.log("hello");
        let textContent = document.getElementById("textBoxArea").value;
        saveFile(textContent);
    });
    document.getElementById("Save").addEventListener('click', function() {
        console.log("hello");
        let textContent = document.getElementById("textBoxArea").value;
        saveFileNoPrompt(textContent);
    });
}

window.addEventListener("load", () => {
  addSection()
})
