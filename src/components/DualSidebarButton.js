import React from 'react';

export default ({leftName, rightName}) => {
  return (
    <div className="btn-group metals" role="group">
      <div className="text-center">
        <button type="button" className="btn btn-lg btn-default">{leftName}</button>
        <button type="button" className="btn btn-lg btn-default">{rightName}</button>
      </div>
    </div>
  );
};
