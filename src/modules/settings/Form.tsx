import React, { useEffect, useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import { CButton } from "../../components/button/CButton";
import { Variant } from "../../styles/ts/types";
import Logout from "../logout/Logout";
import ProfileService from "../../API/ProfileService";
// @ts-ignore
import dots from "../../assets/2.png";
import Sidebar from "../sidebar/Sidebar";
import LoginChange from "../changes/login/LoginChange";
import EmailChange from "../changes/email/EmailChange";
import PasswordChange from "../changes/password/PasswordChange";
import ProfileDelete from "../delete/ProfileDelete";

const Form = observer(() => {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginChangeOpen, setLoginChangeOpen] = useState(false);
    const [emailChangeOpen, setEmailChangeOpen] = useState(false);
    const [passwordChangeOpen, setPasswordChangeOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);


    const submitLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLogoutOpen(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.getProfile();
                // Получаем данные пользователя
                setEmail(response.data.email);
                setLogin(response.data.login);
                //setPassword(response.data.password);
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

    const submitEmailChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEmailChangeOpen(true);
    }

    const submitPasswordChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPasswordChangeOpen(true);
    }

    const openDelete = () => {
        setDeleteOpen(true);
    };

    return (
        <div className ="">
            <header className="">
                <button onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </header>
            <div className="formSettings">
                <p>Почта: {email}  <span style={{ color: 'orange', cursor: 'pointer' }} onClick={submitEmailChange}> Изменить</span>
                </p>
                <EmailChange isOpen={emailChangeOpen} onClose={() => setEmailChangeOpen(false)} /> {}
                <p>Логин: {login} <span style={{ color: 'orange', cursor: 'pointer' }} onClick={submitLoginChange}> Изменить</span>
                </p>
                <LoginChange isOpen={loginChangeOpen} onClose={() => setLoginChangeOpen(false)} /> {}
                <p>Пароль  <span style={{ color: 'orange', cursor: 'pointer' }} onClick={submitPasswordChange}> Изменить</span>
                </p>
                <PasswordChange isOpen={passwordChangeOpen} onClose={() => setPasswordChangeOpen(false)} /> {}
                <p>
                <CButton
                    config={{
                        UIConfig: { variant: Variant.PRIMARY },
                        text: 'Log out'
                    }}
                    onClick={submitLogout} />
                <Logout isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} />
                </p>
                <p className="message" onClick={openDelete}>Удалить аккаунт </p>
                <ProfileDelete isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} /> {}
            </div>
        </div>
    );
});

export default Form;
