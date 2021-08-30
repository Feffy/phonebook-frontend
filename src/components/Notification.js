import React from 'react';

const Notification = ({ message, style }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="notification" style={style}>
      {message}
    </div>
  );
};

export default Notification;
