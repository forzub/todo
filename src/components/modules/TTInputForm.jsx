import React, { useEffect } from 'react';
import Style from './TTSection.module.css';
import MyButton from '../base/MyButton';
import MyInput from '../base/MyInput';

const TTInputForm = ({ onChange, onDone, onCancel, onSubmit, placeholder, value, ...props }) => {


const onSubmit1 = (e) => {
    e.preventDefault();
    onDone();
}

    return (
        <>

            <form onSubmit={onSubmit1} className={Style.ttf_add_items}>
                <MyInput
                    type='text'
                    className={Style.ttf_input}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                />
                <MyButton
                    type='submit'
                    className={Style.ttf_input_but}
                    >
                    +
                </MyButton>
                <MyButton
                    type='reset'
                    className={Style.ttf_input_but}
                    onClick={onCancel}
                    >
                    х
                </MyButton>
            </form>

        </>
    );
}

export default TTInputForm;