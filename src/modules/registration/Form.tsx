import React, {useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
import {CButton} from "../../components/button/CButton";
import {Variant} from "../../styles/ts/types";
import validate from "./RegistrationFormValidationRules";
import AuthService from "../../services/AuthService";

const Form = observer(() => {

    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password_confirmError, setPasswordConfirmError] = useState('');

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
        setEmailError(validate(email, login, password, password_confirm).email);
        setLoginError(validate(email, login, password, password_confirm).login);
        setPasswordError(validate(email, login, password, password_confirm).password);
        setPasswordConfirmError(validate(email, login, password, password_confirm).password_confirm);

        if (emailError === '' && loginError === '' && passwordError === '') {
            AuthService.register(login, email, password)
                .then(response => {
                    window.location.assign("http://localhost:8080/email-consider")

                    }
                )
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                })
            return;
        }
        console.log("meow")
    }

    return (


        <div className="form">
            <input type="text" placeholder="email" onChange={(event) => handleChange(event, setEmail)}/>
            {emailError && (
                <p className="danger">{emailError}</p>
            )}
            <input type="text" placeholder="login" onChange={(event) => handleChange(event, setLogin)}/>
            {loginError && (
                <p className="danger">{loginError}</p>
            )}
            <input type="password" placeholder="password" onChange={(event) => handleChange(event, setPassword)}/>
            {passwordError && (
                <p className="danger">{passwordError}</p>
            )}
            <input type="password" placeholder="password confirm" onChange={(event) => handleChange(event, setPasswordConfirm)}/>
            {password_confirmError && (
                <p className="danger">{password_confirmError}</p>
            )}
            <CButton
                config={{
                    UIConfig: {variant: Variant.PRIMARY},
                    text: 'Register'
                }}
                onClick={submit}/>
            <p className="message">Already registered? <a href="../login">Log in</a></p>

        </div>

    );
});
export default Form;
