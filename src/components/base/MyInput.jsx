import React, { Fragment} from 'react';

const MyInput = ( {type='text', ...props} ) => {
 
    //const [value, setValue] = useState('');

    return (
    <Fragment>
        <input 
            type={type}
            //onChange={event => setValue(event.target.value) }
            //value={value} 
            {...props} 
            
        />
    </Fragment>
  );
}

export default MyInput;