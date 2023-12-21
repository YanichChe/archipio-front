import React, { useEffect, useState } from "react";
import ProjectService from "../../../API/ProjectService";
import PictureService from "../../../API/PictureService";
// @ts-ignore
import { observer } from "mobx-react";

// @ts-ignore
import pic from "../../../assets/mileycyrus.jpeg";
import ProjectOpen from "../open/ProjectOpen";

const ProjectShow = observer((props:
                                  { project: { mainImage: React.SetStateAction<string>; name: React.SetStateAction<string>; description: React.SetStateAction<string>; owner: React.SetStateAction<string>; tags: React.SetStateAction<never[]>; }}) => {
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState(null);
    const [owner, setOwner] = useState("");
    const [tags, setTags] = useState([]);
    const [projectOpen, setProjectOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setUuid(props.project.mainImage);
                console.log("!!!" + props.project.mainImage);
                setName(props.project.name);
                setDescription(props.project.description);
                setOwner(props.project.owner);
                setTags(props.project.tags);

                const responsePicture = await PictureService.getPicture(props.project.mainImage);
                setPicture(responsePicture.data);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData().then(r => console.log('добавить обработку ошибок'));
    }, [props.project]);

    const submitProjectOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setProjectOpen(true);
    }

    return (
        <div className="projectShow">
            <div className="projectShowPicture">
                <p>{picture && <img src={URL.createObjectURL(picture)} alt="Проект" width='360' height='260'/>}</p>
            </div>
            <main className="project-info">
                <div className="projectShowName" onClick={submitProjectOpen}>
                {name}
            </div>

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
