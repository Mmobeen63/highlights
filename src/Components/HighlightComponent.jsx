import React, { useState, useRef, useEffect } from "react";

function AnnotationTool({ children }) {
  const [selectedText, setSelectedText] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    const handleSelection = (e) => {
      const selected = window.getSelection().toString();
      if (selected.length > 0) {
        setSelectedText(selected);
      }
    };

    textRef.current.addEventListener("mouseup", handleSelection);

    return () => {
      textRef.current.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const highlight = document.createElement("span");
      highlight.classList.add("highlight");
      highlight.appendChild(range.extractContents());
      range.insertNode(highlight);
    }
  };

  return (
    <div>
      <span ref={textRef} dangerouslySetInnerHTML={{ __html: children }}></span>
      <div>
        <button onClick={handleHighlight}>Highlight</button>
      </div>
    </div>
  );
}

export default AnnotationTool;
