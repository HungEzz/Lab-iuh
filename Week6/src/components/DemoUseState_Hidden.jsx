import React, { useState } from "react";

function Hidden() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleContent = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="expandable-card">
      <h2>Expandable Content</h2>
      <div className="content-container">
        <p className="preview-text">
          After the Kremlin announced the composition of the Russian Federation delegation 
          {isCollapsed ? "..." : (
            <span className="expanded-content">
              {" "}preparing to travel to Saudi Arabia to negotiate the end of the 
              Ukraine conflict, the public was surprised not to see the presence 
              of diplomatic and defense officials.
            </span>
          )}
        </p>
        <button 
          className="toggle-btn"
          onClick={toggleContent}
        >
          {isCollapsed ? "Read more" : "Collapse"}
        </button>
      </div>
    </div>
  );
}

export default Hidden;