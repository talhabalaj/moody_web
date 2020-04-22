import Layout from "../components/Layout";
import { NextPage } from "next";
import * as yup from 'yup';
import { fetcher } from "../lib/fetcher";
import debounce from "debounce-promise";
import { useForm } from 'react-hook-form';
import { ICreateUser } from "../interfaces/user/ICreateUser";
import { useRouter } from "next/dist/client/router";

async function validationRequest(url: string, data: Partial<ICreateUser>) {
    try {
        const req = fetcher.post(url, data);
        return (await req).data.data.valid;
    } catch (e) {
        return false;
    }
}

async function userNameValidator(value: string): Promise<boolean> {
    return validationRequest('http://localhost:4000/user/check-user', { userName: value });
};

async function emailValidator(value: string) {
    return validationRequest('http://localhost:4000/user/check-email', { email: value });
}

const schema = yup.object().shape({
    email: yup.string().required().email()
        .test("emailUnique", "The email is already used.", debounce(emailValidator, 200)),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().required()
        .test("userNameValidateChar", "Numbers and special charaters are not allowed", (value: string) => /^[A-z]*$/.test(value))
        .test("userNameUnique", "The username is not available", debounce(userNameValidator, 200)),
    password: yup.string().required().min(8, "Minimum length for the password is 8"),
    cfnPassword: yup.string().required()
        .test("shouldMatch", "The password doesn't match.", function (value: string) {
            return this.parent.password === value;
        })
})

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, errors, reset } = useForm<ICreateUser>({ mode: "onBlur", validationSchema: schema });
    const router = useRouter();

    const onSubmit = async (data: ICreateUser) => {
        try {
            const req = await fetcher.post('http://localhost:4000/user/register', data);
            if (req.status === 201) {
                alert("User has been created!");
                router.push('/login');
            }
            reset();
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Layout title={`register`}>
            <style jsx>{`
                input {
                    display: block;
                }
            `}</style>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label>First Name</label>
                <div>
                    <input name="firstName" ref={register} />
                    {errors.firstName?.message}
                </div>
                <label>Last Name</label>
                <div>
                    <input name="lastName" ref={register} />
                    {errors.lastName?.message}
                </div>
                <label>Username</label>
                <div>
                    <input name="userName" ref={register} />
                    {errors.userName?.message}
                </div>
                <label>Email</label>
                <div>
                    <input name="email" ref={register} />
                    {errors.email?.message}
                </div>
                <label>Password</label>
                <div>
                    <input name="password" type="password" ref={register} />
                    {errors.password?.message}
                </div>
                <label>Confirm Password</label>
                <div>
                    <input name="cfnPassword" type="password" ref={register} />
                    {errors.cfnPassword?.message}
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
        </Layout >
    );
}

export default RegisterPage;