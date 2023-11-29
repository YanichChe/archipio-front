import React, { useEffect, useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import { CButton } from "../../components/button/CButton";
import { Variant } from "../../styles/ts/types";
import AuthService from "../../services/AuthService";
// @ts-ignore
import dots from "../../assets/2.png"
import Sidebar from "../sidebar/Sidebar";
import ProfileService from "../../API/ProfileService";

const handleNavigate = () => {
    window.location.href = "/settings";
}

const Form = observer(() => {
    const [login, setLogin] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.getProfile();
                setLogin(response.data.login);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData();
    }, []);
    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setModalOpen(true);
    }

    return (

        <div className="background">
            <header>
                <button onClick={submit}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {}
            </header>
            <main>
                <p>@{login}</p>
                <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Изменить данные'
                    }}
                    onClick={handleNavigate}/>
                <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Создать проект'
                    }}
                    onClick={handleNavigate}/>
            </main>
        </div>

    );
});
export default Form;
