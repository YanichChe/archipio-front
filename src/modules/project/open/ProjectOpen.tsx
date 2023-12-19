import React, { useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import AuthService from "../../../services/AuthService";
import { Variant } from "../../../styles/ts/types";
import { CButton } from "../../../components/button/CButton";
// @ts-ignore
import dump from "../../../assets/dump.png";
// @ts-ignore
import fullHeart from "../../../assets/likedicon.png";
// @ts-ignore
import emptyHeart from "../../../assets/unikedIcon.png";
// @ts-ignore
import pic from "../../../assets/mileycyrus.jpeg";
import ProjectDelete from "../../delete/ProjectDelete";
import ProjectService from "../../../API/ProjectService";
import PictureService from "../../../API/PictureService";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProjectOpen: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [projectDeleteOpen, setProjectDeleteOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState(null);
    const [owner, setOwner] = useState("");
    const [tags, setTags] = useState([]);


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
                setPicture(responsePicture.data);
            } catch (error) {
                console.error("Ошибка при получении данных пользователя", error);
            }
        };
        fetchData().then(r => console.log('добавить обработку ошибок'));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setStateFunction: {
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (arg0: any): void;
    }) => {
        const inputValue = event.target.value;
        setStateFunction(inputValue);
    };

    const submitProjectDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setProjectDeleteOpen(true);
    }


    if (!isOpen) {
        return null;
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
    };


    return (
        <div className="shadow">
            <div className="project-content">
                <span className="close" onClick={onClose}>&times;</span>
                <aside className="image-editor">
                    <img src={pic} alt="фотография проекта"/>
                </aside>
                <main className="project-info">
                    <div className="name">
                        {name.length}
                    </div>
                    <p className="tr">Автор: {owner}</p>
                    <div className="descriptionOpen" style={{ wordWrap: 'break-word' }}>
                        {description}
                    </div>
                    {tags.map((tag, index) => (
                        <div key={index} className="tag">
                            <span className="tag" key={index}>
                                {tag}
                            </span>
                        </div>
                    ))}
                </main>

                <footer>
                    <div>
                        <button className="like-button" type="button" onClick={handleLike}>
                            <img
                                src={isLiked ? fullHeart : emptyHeart}
                                alt="heart-icon"
                                style={{ width: '50px', height: '50px' }}
                            />
                        </button>
                        <button className="delete-button" type="button" onClick={submitProjectDelete}>
                            <img src={dump} alt="delete-icon" style={{ width: '50px', height: '50px' }} />
                        </button>
                        <ProjectDelete isOpen={projectDeleteOpen} onClose={() => setProjectDeleteOpen(false)} />
                    </div>
                </footer>

            </div>
        </div>
    );

};

export default ProjectOpen;
