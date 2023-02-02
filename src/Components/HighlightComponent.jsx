import React, { useState, useRef, useEffect } from "react";

function AnnotationTool({ children }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [highlightLocation, setHighlightLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const textRef = useRef(null);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const highlight = document.createElement("span");
      highlight.style.backgroundColor = selectedColor
        ? selectedColor
        : alert("Choose Color");
      // highlight.classList.add("highlight");
      highlight.appendChild(range.extractContents());
      range.insertNode(highlight);
      setHighlightLocation({
        start: range.startOffset,
        end: range.endOffset,
      });
      localStorage.setItem("highlightedText", highlight.textContent);
      localStorage.setItem(
        "highlightLocation",
        JSON.stringify(highlightLocation)
      );
    }
  };

  return (
    <div>
      <span ref={textRef} dangerouslySetInnerHTML={{ __html: children }}></span>
      <div>
        <button onClick={() => setShowModal(true)}>Select Color</button>
        <button onClick={handleHighlight}>Highlight</button>
        {showModal && (
          <div>
            <div>
              <div>
                <h3>Select Color</h3>
                <div>
                  <button onClick={() => setSelectedColor("yellow")}>
                    yellow
                  </button>
                  <button onClick={() => setSelectedColor("pink")}>pink</button>
                  <button onClick={() => setSelectedColor("lightgreen")}>
                    green
                  </button>
                </div>
                <button onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnotationTool;
