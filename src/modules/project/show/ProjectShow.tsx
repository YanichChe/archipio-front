import React, { useEffect, useState } from "react";
import ProjectService from "../../../API/ProjectService";
import PictureService from "../../../API/PictureService";
// @ts-ignore
import { observer } from "mobx-react";

// @ts-ignore
import pic from "../../../assets/mileycyrus.jpeg";
import ProjectOpen from "../open/ProjectOpen";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProjectShow= observer(() => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
    const [owner, setOwner] = useState("");
    const [tags, setTags] = useState([]);
    const [projectOpen, setProjectOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProject = await ProjectService.getProject();
                setUuid(responseProject.data.uuid);
                setName(responseProject.data.name);
                setDescription(responseProject.data.description);
                setOwner(responseProject.data.owner);
                setTags(responseProject.data.tags);
                const responsePicture = await PictureService.getPicture(uuid);
                setPicture(responsePicture.data.picture);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData().then(r => console.log('добавить обработку ошибок'));
    }, []);

    const submitProjectOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setProjectOpen(true);
    }


    return (
        <div className="projectShow">
            <div className="projectShowPicture">
                <img src={picture} style={{ width: 360, height: 260}}/>
            </div>
            <main className="project-info">
            <div className="projectShowName" onClick={submitProjectOpen}>
                {name}
            </div>
                <ProjectOpen isOpen={projectOpen} onClose={() => setProjectOpen(false)} /> {}
            <div className="projectShowOwner">
                Автор: {owner}
            </div>
            <div className="projectShowDescription" style={{ wordWrap: 'break-word' }}>
                {description}
            </div>
                <div>
                    {tags.map((tag, index) => (
                        <div key={index} className="tag">
                            <span className="tag" key={index}>
                                {tag}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
});

export default ProjectShow;
