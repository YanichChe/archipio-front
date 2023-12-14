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
    const [activeTab, setActiveTab] = useState("myProjects");


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

    const openTab = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    return (

        <div className="background">
            <header>
                <button onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {}
            </header>
            <main className ="profileMain">
                <p>@{login}</p>
                <p>
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
                </p>
                    <div className="tab">
                        <button
                            className={activeTab === "myProjects" ? "tablinks active" : "tablinks"}
                            onClick={() => openTab("myProjects")}
                        >
                            Мои проекты
                        </button>
                        <button
                            className={activeTab === "favoriteProjects" ? "tablinks active" : "tablinks"}
                            onClick={() => openTab("favoriteProjects")}
                        >
                            Понравившиеся проекты
                        </button>
                    </div>

                    {activeTab === "myProjects" && (
                        <div className="tabcontent">
                            <h1>дима</h1>
                        </div>
                    )}

                    {activeTab === "favoriteProjects" && (
                        <div className="tabcontent">
                            <h1>яна</h1>
                        </div>
                    )}
            </main>
        </div>

    );
});
export default Form;
