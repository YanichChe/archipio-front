import React, { useEffect, useState } from "react";
// @ts-ignore
import { observer } from "mobx-react";
import { CButton } from "../../components/button/CButton";
import { Variant } from "../../styles/ts/types";
// @ts-ignore
import dots from "../../assets/2.png"
import Sidebar from "../sidebar/Sidebar";
import ProfileService from "../../API/ProfileService";
import ProjectCreate from "../project/create/ProjectCreate";
import PictureService from "../../API/PictureService";
import ProjectShow from "../project/show/ProjectShow";

// @ts-ignore
import pic from "../../assets/mileycyrus.jpeg";
import ProjectService from "../../API/ProjectService";
import InfiniteScroll from "react-infinite-scroll-component";

const handleNavigate = () => {
    window.location.href = "/settings";
}

const Form = observer(() => {
    const [login, setLogin] = useState("");
    const [owner, setOwner] = useState("");
    const [uuid, setUuid] = useState("");
    const [liked, setLiked] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projectCreateOpen, setProjectCreateOpen] = useState(false);
    const [projectOpen, setProjectOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("myProjects");
    const [picture, setPicture] = useState(null);
    const [projects, setProjects] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProfile = await ProfileService.getProfile();
                setLogin(responseProfile.data.login);
                setUuid(responseProfile.data.uuid);
                const responsePicture = await PictureService.getPicture(uuid);
                setPicture(responsePicture.data);
                const responseProject = await ProjectService.getProject();
                setOwner(responseProject.data.owner);
                setLiked(responseProject.data.liked);
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

    const fetchMoreData = () => {
        if (projects.length >= 10)
            setHasMore(false);
        return;
    }

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
                            <InfiniteScroll
                                dataLength={projects.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h4>Loading...</h4>}
                            >
                                {projects.map(project => {
                                    if (owner === login) {
                                        return <ProjectShow key={project} />
                                    } else {
                                        return null;
                                    }
                                })}

                            </InfiniteScroll>
                        </div>
                    )}

                    {activeTab === "favoriteProjects" && (
                        <div className="tabcontent">
                            <InfiniteScroll
                                dataLength={projects.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h4>Loading...</h4>}
                            >
                                {projects.map(project => {
                                    if (liked) {
                                        return <ProjectShow key={project} />
                                    } else {
                                        return null;
                                    }
                                })}

                            </InfiniteScroll>
                        </div>
                    )}
            </main>
        </div>

    );
});
export default Form;
