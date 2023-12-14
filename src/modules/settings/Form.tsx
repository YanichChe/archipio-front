import React, {useEffect, useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
import {CButton} from "../../components/button/CButton";
import {Variant} from "../../styles/ts/types";
import Logout from "../logout/Logout";
import AuthService from "../../services/AuthService";
import ProfileService from "../../API/ProfileService";
// @ts-ignore
import dots from "../../assets/2.png";
import Sidebar from "../sidebar/Sidebar";

const Form = observer(() => {
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModalOpen(true);
        console.log("meow");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.GetMainImage(email, login);
                // Получаем данные пользователя
                setEmail(response.data.email);
                setLogin(response.data.login);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData();
    }, []);

    const submitSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSidebarOpen(true);
    }

    return (
        <div>
            <header className="headerSettings">
                <button onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {}
            </header>
            <div className="formSettings">
                <p>Email: {email}</p>
                <p>Login: {login}</p>
                <CButton
                    config={{
                        UIConfig: { variant: Variant.PRIMARY },
                        text: 'Log out'
                    }}
                    onClick={submit} />
                <Logout isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {}
            </div>
        </div>
    );
});

export default Form;
