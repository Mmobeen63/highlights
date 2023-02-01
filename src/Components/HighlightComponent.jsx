import React, { useState, useRef, useEffect } from "react";

function AnnotationTool({ children }) {
  const [selectedText, setSelectedText] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [highlightLocation, setHighlightLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const textRef = useRef(null);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const highlight = document.createElement("span");
      highlight.style.backgroundColor = selectedColor;
      highlight.classList.add("highlight");
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
          <div className="modal">
            <div className="modal-content">
              <div>
                <h3>Select Color</h3>
                <div className="color-picker">
                  <div
                    className="color-option"
                    onClick={() => setSelectedColor("yellow")}
                    style={{ backgroundColor: "yellow" }}
                  >
                    yellow
                  </div>
                  <div
                    className="color-option"
                    onClick={() => setSelectedColor("pink")}
                    style={{ backgroundColor: "pink" }}
                  >
                    pink
                  </div>
                  <div
                    className="color-option"
                    onClick={() => setSelectedColor("lightgreen")}
                    style={{ backgroundColor: "lightgreen" }}
                  >
                    green
                  </div>
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
