import { Input, Checkbox, Row, Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { authOpenLogin, authPushUserData, authCreateAccountOnBase } from '../../store/auth';



const SignUp = () => {
    const dispatch = useDispatch();

    const onSubmit = values => {
        console.log('SUBMIT', values);
        const user = { name: values.email, password: values.password };
        dispatch( authPushUserData(user) );
        dispatch( authCreateAccountOnBase() );
    };

    const onClickLogin = () => { dispatch(authOpenLogin()); }

    const validationSchema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
        confirmPassword: yup.string().required().oneOf([yup.ref('password')]),
        agree: yup.boolean().test(val => val),
    });

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    }

    const formik = useFormik({ initialValues, onSubmit, validationSchema, validateOnMount: true });

    return (
        <div className="login-box">
            <h1>Registration Page</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    name="email"
                    placeholder="e-mail"
                    value={formik.values.email}
                    validateOnBlur
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email && <Paragraph type="danger">{formik.errors.email}</Paragraph>}
                <Input.Password
                    name='password'
                    placeholder="input password"
                    validateOnBlur
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                <Input.Password
                    name='confirmPassword'
                    placeholder="confirm password"
                    validateOnBlur
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <Paragraph type="danger">{formik.errors.confirmPassword}</Paragraph>}
                <Checkbox
                    name='agree'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.agree}
                >Agree to terms</Checkbox>

                <Row justify='space-between'>
                    <Button type='primary' htmlType='submit' disabled={!formik.values.agree || formik.errors.password || formik.errors.confirmPassword || formik.errors.email}>Sign Up</Button>
                    <Button type='default' onClick={onClickLogin} >Login</Button>
                </Row>
            </form>
        </div>
    );
}

export default SignUp;
// { formik.touched.agree && formik.errors.agree && <Paragraph type="danger">{console.log(formik)}</Paragraph> }