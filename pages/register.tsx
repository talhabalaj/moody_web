import { useState, FormEvent } from "react";
import fetch from 'isomorphic-unfetch';
import Layout from "../components/Layout";

const RegisterPage: React.FunctionComponent<{}> = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const object: any = {};

        formData.forEach(function (value, key) {
            object[key] = value;
        });

        try {
            const response = await fetch('http://localhost:4000/user/register', {
                body: JSON.stringify(object),
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();

            if (response.status == 201) {
                console.log(data);
            } else {
                setError(data.message);
            }
        } catch (e) {
            setError(e.message)
        }

    }

    return (
        <Layout title={`register`}>
            <form onSubmit={handleSubmit} onChange={() => setError('')}>
                <div>
                    <label>firstName: </label>
                    <input
                        type="text"
                        name="firstName"
                    />
                </div>
                <div>
                    <label>lastName: </label>
                    <input
                        type="text"
                        name="lastName"
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="userName"
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        name="email"
                    />
                </div>
                <div>
                    <label>Phone: </label>
                    <input
                        type="text"
                        name="phoneNumber"
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                    />
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                    />
                </div>
                {error ? error : ''}
                <button type="submit">Register</button>
            </form>
        </Layout>
    );
}

export default RegisterPage;