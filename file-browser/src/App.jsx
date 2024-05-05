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
      <div className="flex gap-52 p-4 justify-between">
        <img src="/icon.png" className="w-40 rounded-full" />
        <h1 className="text-6xl font-bold">Bieber Browser</h1>
        <img src="/icon.png" className="w-40 rounded-full" />
      </div>
      <div className="flex justify-center">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
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
      </div>
      <div className="justify-between flex p-3">
        <div className="items-star">
          <button
            onClick={handleFileOpen}
            className="border border-bieber3-500 rounded-2xl p-3 fill-bieber3 bg-bieber3 text-bieber1 hover:bg-bieber2 hover:text-bieber4"
          >
            Open File
          </button>
        </div>
        <div className="items-end">
          <button
            onClick={handleSaveFile}
            className="border border-bieber3-500 rounded-2xl p-3 fill-bieber3 bg-bieber5 text-bieber1 hover:bg-bieber2 hover:text-bieber4"
          >
            Save As
          </button>
          <button
            onClick={handleSaveFileNoPrompt}
            className="border border-bieber3-500 rounded-2xl p-3 fill-bieber3 bg-bieber5 text-bieber1 hover:bg-bieber2 hover:text-bieber4"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
