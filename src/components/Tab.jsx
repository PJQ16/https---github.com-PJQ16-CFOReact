import React, { useState } from 'react';

export default function Tab({ children }) {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="card-body">
      <ul class="nav nav-pills pb-3" id="myTab3" role="tablist">
        {React.Children.map(children, (child, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${index === activeTab ? 'active' : ''}`}
              style={{
                color: '#ffffff',
                backgroundColor: index === activeTab ? '#473c98' : '#bababa', // Change background based on active state
              }}
              id={`pills-tab-${index}`}
              data-bs-toggle="pill"
              data-bs-target={`#pills-content-${index}`}
              type="button"
              role="tab"
              aria-controls={`pills-content-${index}`}
              aria-selected={index === activeTab}
              onClick={() => setActiveTab(index)} // Update active tab on click
            >
              {child.props.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {React.Children.map(children, (child, index) => (
          <div
            className={`tab-pane ${index === activeTab ? 'show active' : ''}`}
            id={`pills-content-${index}`}
            role="tabpanel"
            aria-labelledby={`pills-tab-${index}`}
            tabIndex="0"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
