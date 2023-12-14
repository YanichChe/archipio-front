import React, { useState}  from "react";
import { Variant } from "../../../styles/ts/types";
import { CButton } from "../../../components/button/CButton";
import validate from "./LoginChangeValidationRules";
import AuthService from "../../../services/AuthService";
import ProfileService from "../../../API/ProfileService";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const LoginChange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('');

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
        setLoginError(validate(login).login);

        if (loginError === '') {
            ProfileService.editLogin(login).then(r => console.log('Сделать обработку ошибки'));
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="change-content">
                <span className="closeChange" onClick={onClose}>&times;</span>
                <input type="text" placeholder="Введите новый логин" onChange={(event) => handleChange(event, setLogin)}/>
                {loginError && (
                    <p className="danger">{loginError}</p>
                )}
                <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Сохранить'
                    }}
                    onClick={submit}/>
            </div>
        </div>
    );
};

export default LoginChange;
