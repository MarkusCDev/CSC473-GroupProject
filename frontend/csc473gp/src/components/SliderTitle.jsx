import React from 'react';
import PropTypes from 'prop-types';



const SliderTitle = ({ img, title, link }) => {
  return (
    <div className="border-b mb-5 flex justify-between text-sm">
      <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
      <img
          className="h-6 mr-3"
          src={img}
          x="0px"
          y="0px"
          viewBox="0 0 455.005 455.005"
          style={{ enableBackground: 'new 0 0 455.005 455.005' }}
          xmlSpace="preserve"
        />
        <span className="font-semibold inline-block">{title}</span>
      </div>
      {link && (
        <a href={link} className="text-indigo-600">
          See All
        </a>
      )}
    </div>
  );
};

SliderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default SliderTitle;