import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const PictureChange: React.FC<ModalProps> = ({ isOpen, onClose }) => {

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

    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="logout-content">
                <span className="close" onClick={onClose}>&times;</span>
            </div>
        </div>
    );
};

// @ts-ignore
export default PictureChange;
