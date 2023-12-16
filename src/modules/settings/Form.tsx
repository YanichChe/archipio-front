import React, { useEffect, useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import { CButton } from "../../components/button/CButton";
import { Variant } from "../../styles/ts/types";
import Logout from "../logout/Logout";
import AuthService from "../../services/AuthService";
import ProfileService from "../../API/ProfileService";
// @ts-ignore
import dots from "../../assets/2.png";
import Sidebar from "../sidebar/Sidebar";
import LoginChange from "../changes/login/LoginChange";

const Form = observer(() => {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginChangeOpen, setLoginChangeOpen] = useState(false);


    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLogoutOpen(true);
        console.log("meow");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.getProfile();
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

    const submitLoginChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoginChangeOpen(true);
    }

    return (
        <div className ="">
            <header className="">
                <button onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </header>
            <div className="formSettings">
                <p>Email: {email}</p>
                <p>Login: {login} <span style={{ color: 'orange', cursor: 'pointer' }} onClick={submitLoginChange}> Изменить</span>
                </p>
                <LoginChange isOpen={loginChangeOpen} onClose={() => setLoginChangeOpen(false)} /> {}
                <CButton
                    config={{
                        UIConfig: { variant: Variant.PRIMARY },
                        text: 'Log out'
                    }}
                    onClick={submit} />
                <Logout isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
            </div>
        </div>
    );
});

export default Form;
