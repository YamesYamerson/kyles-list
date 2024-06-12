import React from 'react';

const CategoryAccordion = ({ id, title, items, subCategories }) => (
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
        {subCategories ? (
          <div className="accordion" id={`accordion-${id}`}>
            {Object.keys(subCategories).map((subId) => (
              <div className="accordion-item" key={subId}>
                <h2 className="accordion-header" id={`heading-${id}-${subId}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse-${id}-${subId}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${id}-${subId}`}
                  >
                    {subId}
                  </button>
                </h2>
                <div
                  id={`collapse-${id}-${subId}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading-${id}-${subId}`}
                  data-bs-parent={`#accordion-${id}`}
                >
                  <div className="accordion-body">
                    <ul>
                      {subCategories[subId].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

export default CategoryAccordion;
