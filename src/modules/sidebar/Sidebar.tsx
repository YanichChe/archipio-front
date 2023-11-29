import React, { useState } from "react";
// @ts-ignore
import icon from "../../assets/icon.png"
import Logout from "../logout/Logout";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [modalOpen, setModalOpen] = useState(false);

    if (!isOpen) {
        return null;
    }

    const openModal = () => {
        setModalOpen(true);
    };


    return (
        <div className="shadow">
            <div className="sidebar-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2><img src={icon} width ="150" height="150"></img> <br/>
                    <a href="../user">Аккаунт</a> <br/>
                Главная</h2>
                <footer>
                    <p className="message" onClick={openModal}>ВЫХОД</p>
                </footer>
                <Logout isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {}
            </div>
        </div>
    );
};

export default Sidebar;
