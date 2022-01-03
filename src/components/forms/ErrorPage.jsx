import { Row, Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authOpenLogin } from '../../store/auth';

const ErrorPage = () => {

  const dispatch = useDispatch();
  const errcode = useSelector(store => store.auth.errors.code);
  const errmess = useSelector(store => store.auth.errors.message);

  const initialValues = {}
  const onSubmit = values => {
    dispatch(authOpenLogin());
  }

  const formik = useFormik({ initialValues, onSubmit });

  return (
    <div className="login-box">
      <h1>{`Error ${errcode}`}</h1>
      <Paragraph>{errmess}</Paragraph>
      <form onSubmit={formik.handleSubmit}>
        <Row justify='end'>
          <Button type='primary' htmlType='submit' >Back</Button>
        </Row>
      </form>
    </div>
  );
}

export default ErrorPage;