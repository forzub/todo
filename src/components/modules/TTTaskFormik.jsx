import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { newTaskHidden, setTaskItem } from '../../store/newTask';
import { setTaskItemToBase, includeTaskItem } from '../../store/todo';

const TTTaskFormik = () => {
  const dispatch = useDispatch();

  const initialValues = {
    begin: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    title: '',
    dedline: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    done: false
  };


  const onSubmit = () => {
    dispatch (setTaskItem(formik.values) );
    dispatch ( newTaskHidden() );
    dispatch ( setTaskItemToBase(formik.values) );
  }

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    dedline: yup.string().required()
  });


  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='ttr_form_new_task'>
        <p>
          <label htmlFor="title"> Описание задачи</label>
          <input
            id='title'
            name="title"
            type="text"
            placeholder='задача'
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </p>
        <p>
          <label htmlFor="dedline"> Срок выполнения</label>
          <input
            id='dedline'
            name="dedline"
            type="date"
            placeholder='когда закончить'
            onChange={formik.handleChange}
            value={formik.values.dedline}
          />
        </p>
        <div className="but_wrp">
          <button
            type="submit"
            disabled={!formik.isValid && true}
          >
            Submit
          </button>
          <p>{ (!formik.isValid)  ? formik.errors.title : null}</p>
        </div>
      </form>

    </>);
}

export default TTTaskFormik;