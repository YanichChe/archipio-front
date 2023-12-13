import React, {useEffect, useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
import {CButton} from "../../components/button/CButton";
import {Variant} from "../../styles/ts/types";
import AuthService from "../../services/AuthService";
// @ts-ignore
import dots from "../../assets/2.png"
import Sidebar from "../sidebar/Sidebar";
import ProfileService from "../../API/ProfileService";
import ProjectCreate from "../project/create/ProjectCreate";

const handleNavigate = () => {
    window.location.href = "/settings";
}

const Form = observer(() => {
    const [login, setLogin] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projectCreateOpen, setProjectCreateOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProfileService.GetMainImage(login);
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

    const submitProjectCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProjectCreateOpen(true);
    }

    return (

        <div className="background">
            <header>
                <button onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {}
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
                    onClick={submitProjectCreate}/>
                <ProjectCreate isOpen={projectCreateOpen} onClose={() => setProjectCreateOpen(false)} /> {}
            </main>
        </div>

    );
});
export default Form;
