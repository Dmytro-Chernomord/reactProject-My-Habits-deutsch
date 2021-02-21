import React from 'react';

const ProgressBar = props => {
  const { completed } = props;

  const containerStyles = {
    display: 'inline-block',
    height: 6,
    width: 440,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#43D190',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
