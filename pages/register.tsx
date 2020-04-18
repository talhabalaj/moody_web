import Layout from "../components/Layout";
import { NextPage } from "next";
import { Formik, Field } from 'formik';
import { ICreateUser } from "../interfaces/user/ICreateUser";
import * as yup from 'yup';
import { fetcher } from "../lib/fetcher";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    userName: yup.string().required(),
})

const RegisterPage: NextPage = () => {

    const initialValues: ICreateUser = {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        userName: '',
        phoneNumber: ''
    }

    return (
        <Layout title={`register`}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, action) => {
                    alert(JSON.stringify(values))
                    action.resetForm();
                }}
                validationSchema={schema}
            >
                {({
                    values,
                    errors,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    status,
                    /* and other goodies */
                }) => (
                        <form onSubmit={handleSubmit} >
                            {status}
                            <fieldset disabled={isSubmitting}>

                                <Field name="userName" value={values.userName} validate={async (value: string) => {
                                    try {
                                        const req = await fetcher.post('http://localhost:4000/user/check-user', JSON.stringify({ userName: value }));
                                        if (req.data.data.valid) {
                                            return undefined;
                                        } else {
                                            return "This is error";
                                        }
                                    } catch (e) {
                                        return e.message;
                                    }

                                }} />
                                {errors.userName && touched.userName && errors.userName}
                                < Field name="email" value={values.email} />
                                {errors.email && touched.email && errors.email}
                                < button type="submit" disabled={isSubmitting}>
                                    Submit
                             </button>
                            </fieldset>
                        </form>
                    )}
            </Formik>
        </Layout >
    );
}

export default RegisterPage;