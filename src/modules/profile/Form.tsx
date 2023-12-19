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
import ProjectCreate from "../project/create/ProjectCreate";
import PictureService from "../../API/PictureService";
import ProjectOpen from "../project/open/ProjectOpen";

const handleNavigate = () => {
    window.location.href = "/settings";
}

const Form = observer(() => {
    const [login, setLogin] = useState("");
    const [uuid, setUuid] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projectCreateOpen, setProjectCreateOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("myProjects");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProfile = await ProfileService.getProfile();
                setLogin(responseProfile.data.login);
                setUuid(responseProfile.data.uuid);
                const responsePicture = await PictureService.getPicture(uuid);
                setPicture(responsePicture.data);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData().then(r => console.log('добавить обработку ошибок'));
    }, []);
    const submitSidebar = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSidebarOpen(true);
    }

    const submitProjectCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProjectCreateOpen(true);
    }

    const submitProjectOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProjectOpen(true);
    }

    const openTab = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    return (

        <div className="background">
            <header>
                <button onClick={submitSidebar}>
                    <img className="dots" src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {}
            </header>
            <main className ="profileMain">
                <p>{picture && <img src={picture} alt="Аватарка" width='50' height='50'/>}</p>
                <p>@{login}</p>
                <p>
                    <CButton
                    config={{
                        UIConfig: {variant: Variant.PRIMARY},
                        text: 'Настройки'
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
                            <CButton
                                config={{
                                    UIConfig: {variant: Variant.PRIMARY},
                                    text: 'Открыть проект'
                                }}
                                onClick={submitProjectOpen}/>
                            <ProjectOpen isOpen={projectOpen} onClose={() => setProjectOpen(false)} /> {}
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
