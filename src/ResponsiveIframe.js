// ResponsiveIframe.js
import React from 'react';
import './ResponsiveIframe.css';

const ResponsiveIframe = ({ src, title }) => (
  <div className="iframe-container">
    <iframe
      src={src}
      title={title}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
);

export default ResponsiveIframe;
