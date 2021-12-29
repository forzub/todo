import React, { Fragment} from 'react';

function MyButton( {type = 'button', children, ...props} ) {
  
  return (
    <Fragment>
      <button type={type} {...props} >{children}</button>
    </Fragment>
  );
}

export default MyButton;