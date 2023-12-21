import React from "react";
import { Variant } from "../../styles/ts/types";
import { CButton } from "../../components/button/CButton";
import { authStore } from "../../store/AuthStore";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const handleNavigate = () => {
    authStore.logout();
    window.location.href = "/login";
}

const ProjectDelete: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="logout-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Вы действительно хотите удалить проект? </h3>
                <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Отменить'
                    }}
                    onClick={onClose}/>
                <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Удалить'
                    }}
                    onClick={handleNavigate}/>
            </div>
        </div>
    );
};

export default ProjectDelete;
