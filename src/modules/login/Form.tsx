import React, {useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
import {CButton} from "../../components/button/CButton";
import {Variant} from "../../styles/ts/types";
import validate from "./LoginFormValidationRules";
import AuthService from "../../services/AuthService";

const Form = observer(() => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setStateFunction: {
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (arg0: any): void;
    }) => {
        const inputValue = event.target.value;
        setStateFunction(inputValue);
    };

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setEmailError(validate(email, password).email);
        setPasswordError(validate(email, password).password);

        if (emailError === '' && passwordError === '') {
            AuthService.login(email, password)
                .then(response => {
                    console.log('okey');

                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                })
        }

        console.log("meow")
    }

    return (


        <div className="form">
            <input type="text" placeholder="email" onChange={(event) => handleChange(event, setEmail)}/>
            {emailError && (
                <p className="danger">{emailError}</p>
            )}
            <input type="password" placeholder="password"
                   onChange={(event) => handleChange(event, setPassword)}/>
            {passwordError && (
                <p className="danger">{passwordError}</p>
            )}
            <CButton
                config={{
                    UIConfig: {variant: Variant.PRIMARY},
                    text: 'Log in'
                }}
                onClick={submit}/>
            <p className="message">Not registered? <a href="../register">Create an account</a></p>

        </div>

    );
});
export default Form;
