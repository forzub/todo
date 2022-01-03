import { Input, Checkbox, Row, Button } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { authOpenRegistration, authRequestToBase, authPushUserData } from '../../store/auth';



const Login = () => {
    const dispatch = useDispatch();

    const onSubmit = values => {  
        const user = { name: values.email, password: values.password };
        dispatch( authPushUserData(user) );
        dispatch( authRequestToBase() );
    };

    const Registration = () => { 
        dispatch( authOpenRegistration() ) 
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
        agree: yup.boolean().test(val => val),
    });

    const initialValues = {
        email: '',
        password: '',
        agree: false,
    }

    const formik = useFormik({ initialValues,  onSubmit, validationSchema, validateOnMount: true });

    return (
        <div className="login-box">
            <h1>Login Page</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    name="email"
                    placeholder="e-mail"
                    value={formik.values.email}
                    validateOnBlur
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email && <Paragraph type="danger">{formik.errors.email}</Paragraph>}
                <Input.Password
                    name='password'
                    placeholder="input password"
                    validateOnBlur
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} />
                { formik.touched.password && formik.errors.password && <Paragraph type="danger">{formik.errors.password}</Paragraph> }
                <Checkbox
                    name='agree'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.agree}
                >Agree to terms</Checkbox>
                
                <Row justify='space-between'>
                    <Button type='primary' htmlType='submit' disabled={!formik.values.agree || formik.errors.password  || formik.errors.email}>Login</Button>
                    <Button type='default' onClick={Registration}>Registration</Button>
                </Row>
            </form>
        </div>
    );
}

export default Login;
// { formik.touched.agree && formik.errors.agree && <Paragraph type="danger">{console.log(formik)}</Paragraph> }