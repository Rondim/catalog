import React from 'react';

export default ({ btnName }) => {
  return (
    <div>
      <button type="button"
        className="btn btn-lg btn-default btn-sidebar">
        {btnName}
      </button>
    </div>
  );
};
// <button type="button"
//   class="btn btn-lg btn-default btn-sidebar"
//   data-toggle="popover"
//   title="Popover title"
//   data-placement="left"
//   data-content="And here's some amazing content. It's very engaging. Right?">
//   {btnName}
// </button>
