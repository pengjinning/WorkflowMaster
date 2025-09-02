import React from 'react';

const StatsCard = ({ bgColor, title, value, subtitle, icon }) => {
  return (
    <div className={`card ${bgColor} text-white`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="card-title">{value}</h3>
            <p className="card-text">{title}</p>
          </div>
          <div className="align-self-center">
            <i className={`fas ${icon} fa-2x`}></i>
          </div>
        </div>
        {subtitle && (
          <div className="mt-2">
            <small>{subtitle}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;