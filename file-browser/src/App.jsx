import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./App.css";

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

export default function App() {
  const [fileContent, setFileContent] = useState("");
  const editorRef = useRef(null);

  const handleFileOpen = async () => {
    const content = await getFile();
    setFileContent(content);
  };

  const handleSaveFile = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      saveFile(content);
    }
  };

  const handleSaveFileNoPrompt = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      saveFileNoPrompt(content);
    }
  };
  return (
    <>
      <div>
        <img src="/icon.png" width={200} style={{ float: "left" }} />
        <h1>Bieber Browser</h1>
      </div>
      <div>
        <Editor
          apiKey=
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={fileContent}
          init={{
            height: 500,
            width: 1000,
            menubar: false,
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
            toolbar:
              "undo redo | insertdatetime |" +
              "removeformat searchreplace | code visualblocks preview fullscreen  | wordcount | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleFileOpen}>Open File</button>
          <div>
            <button onClick={handleSaveFile}>Save As</button>
            <button onClick={handleSaveFileNoPrompt}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
