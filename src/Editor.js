// src/Editor.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./index.css";

const Editor = () => {
    const [editorHtml, setEditorHtml] = useState("");
    const [titleHtml, settitleHtml] = useState("");

    const handleChange = (html) => {
        setEditorHtml(html);
        settitleHtml(html);
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:5000/api/v1/notes", {
                title: titleHtml,
                content: editorHtml,
            });
            alert("Note saved!");
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <div className="editor-container">
            <label>Title - </label>
            <input
                type="text"
                placeholder="Enter title"
                onChange={(e) => settitleHtml(e.target.value)}
            />
            <label>Content - </label>
            <ReactQuill value={editorHtml} onChange={handleChange} />
            <button onClick={handleSave}>Save Note</button>
        </div>
    );
};

export default Editor;
