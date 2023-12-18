import React, { useState}  from "react";
import { Variant } from "../../../styles/ts/types";
import { CButton } from "../../../components/button/CButton";
import validate from "./PasswordChangeValidationRules";
import AuthService from "../../../services/AuthService";
import ProfileService from "../../../API/ProfileService";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const PasswordChange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

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
        setOldPasswordError(validate(oldPassword, newPassword).oldPassword);
        setNewPasswordError(validate(oldPassword, newPassword).newPassword);

        if (oldPasswordError === '' && newPasswordError === '') {
            ProfileService.editPassword(oldPassword, newPassword).then(r => window.location.href = '../settings')
                .catch(error => {console.log(error)});
        }
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="logout-content">
                <span className="close" onClick={onClose}>&times;</span>
                <input type="password" placeholder="Введите старый пароль" onChange={(event) => handleChange(event, setOldPassword)}/>
                {oldPasswordError && (
                    <p className="danger">{oldPasswordError}</p>
                )}
                <input type="password" placeholder="Введите новый пароль" onChange={(event) => handleChange(event, setNewPassword)}/>
                {newPasswordError && (
                    <p className="danger">{newPasswordError}</p>
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

export default PasswordChange;
