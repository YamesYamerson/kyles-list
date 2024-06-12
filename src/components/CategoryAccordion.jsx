import React from 'react';
import { Accordion } from 'react-bootstrap';

const CategoryAccordion = ({ title, items }) => (
  <Accordion.Item eventKey={title}>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Accordion.Body>
  </Accordion.Item>
);

export default CategoryAccordion;
