import React, { useState}  from "react";
import { Variant } from "../../../styles/ts/types";
import { CButton } from "../../../components/button/CButton";
import validate from "./EmailChangeValidationRules";
import AuthService from "../../../services/AuthService";
import ProfileService from "../../../API/ProfileService";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const EmailChange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

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
        setEmailError(validate(email).email);

        if (emailError === '') {
            ProfileService.editEmail(email).then(r => window.location.href = '../settings')
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
                <input type="text" placeholder="Введите новую почту" onChange={(event) => handleChange(event, setEmail)}/>
                {emailError && (
                    <p className="danger">{emailError}</p>
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

export default EmailChange;
