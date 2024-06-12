import React from 'react';

const CategoryAccordion = ({ id, title, items }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id={`heading-${id}`}>
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse-${id}`}
        aria-expanded="false"
        aria-controls={`collapse-${id}`}
      >
        {title}
      </button>
    </h2>
    <div
      id={`collapse-${id}`}
      className="accordion-collapse collapse"
      aria-labelledby={`heading-${id}`}
      data-bs-parent="#accordionExample"
    >
      <div className="accordion-body">
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default CategoryAccordion;
