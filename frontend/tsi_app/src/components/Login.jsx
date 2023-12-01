import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await authenticateUser();

        if (success) {
            navigate('/index');
        } else {
            console.error('Echec de l\'authentification');
        }

    }

    //Handle Login API Integration here
    const authenticateUser = async () => {

        const api = `${process.env.REACT_APP_BACK_URL}`;
        try {
            // const token = localStorage.getItem('token');

            const resp = await axios.post(api + "/auth/login", loginState, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                }
            });

            // Vérification de la réponse du backend
            if (resp.status === 200) {
                localStorage.setItem('token', resp.data.token);
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}