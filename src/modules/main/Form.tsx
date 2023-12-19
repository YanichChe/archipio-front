import React, { useEffect, useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import { CButton } from "../../components/button/CButton";
import { Variant } from "../../styles/ts/types";
import AuthService from "../../services/AuthService";
// @ts-ignore
import dots from "../../assets/2.png"
// @ts-ignore
import glass from "../../assets/glass.png"
import Sidebar from "../sidebar/Sidebar";
import ProfileService from "../../API/ProfileService";
import ProjectCreate from "../project/create/ProjectCreate";
import PictureService from "../../API/PictureService";
import ProjectShow from "../project/show/ProjectShow";

const handleNavigate = () => {
    window.location.href = "/settings";
}

const Form = observer(() => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projectCreateOpen, setProjectCreateOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

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

    return (

        <div className="background">
            <header>
                <button className="dots" onClick={submitSidebar}>
                    <img src={dots}></img>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> {}
            </header>
            <nav className="Main">
                <form className="searchMain">
                    <input className="searchInput" type="text" placeholder="Поиск проектов" />
                    <button className="searchButton" type="submit">
                        <img src={glass} alt="search-icon" style={{ width: '30px', height: '30px' }} />
                    </button>
                    <button className="create-button" type="button" onClick={submitProjectCreate}>Создать проект</button>
                    <ProjectCreate isOpen={projectCreateOpen} onClose={() => setProjectCreateOpen(false)} />
                </form>
            </nav>
            <main className="tabcontent">
                <ProjectShow/>
                <ProjectShow/>

            </main>

        </div>

    );
});
export default Form;
