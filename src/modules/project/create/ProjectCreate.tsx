import React, {useEffect, useState} from "react";
import validate from "./ProjectCreateValidationRules";
import AvatarEditor from "react-avatar-editor";
import ProfileService from "../../../API/ProfileService";
import AuthService from "../../../services/AuthService";
import {Variant} from "../../../styles/ts/types";
import {CButton} from "../../../components/button/CButton";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const ProjectCreate: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState<AvatarEditor | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isImageEdited, setIsImageEdited] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [login, setLogin] = useState("");
    const [type, setType] = useState("private");
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

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

    const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>, setStateFunction: {
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (value: React.SetStateAction<string>): void;
        (arg0: any): void;
    }) => {
        const descriptionValue = event.target.value;
        setStateFunction(descriptionValue);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const imageFile = event.target.files[0];
        // @ts-ignore
        setImage(imageFile);
        setIsImageEdited(false);
    };

    const handleSave = () => {
        if (editor) {
            const canvasScaled = editor.getImageScaledToCanvas();
            const editedImageUrl = canvasScaled.toDataURL();
            setEditedImage(editedImageUrl);
            setIsImageEdited(true);
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setNameError(validate(name, description).name);
        setDescriptionError(validate(name, description).description);
    }

    const handleAddTag = () => {
        if (newTag && tags.length < 5) {
            // @ts-ignore
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };


    const handleTagKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            handleAddTag();
        }
    };

    const handleEditTag = ({index, newTag}: { index: any, newTag: any }) => {
        const updatedTags = [...tags];
        // @ts-ignore
        updatedTags[index] = newTag;
        setTags(updatedTags);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="project-content">
                <span className="close" onClick={onClose}>&times;</span>
                <aside className="image-editor">
                    <input type="file" accept=".jpg, .png" onChange={handleImageChange} />
                    {image && !isImageEdited && (
                        <AvatarEditor
                            ref={(e) => setEditor(e)}
                            image={image}
                            width={520}
                            height={520}
                            border={0}
                            color={[255, 255, 255, 0.6]}
                            scale={1.2}
                        />
                    )}
                    <button onClick={handleSave} className="save-button">Save</button>
                    {editedImage && (isImageEdited && <img src={editedImage} alt="Edited" />
                    )}
                </aside>
                <main>
                    <div className="project-info">
                        <div className="name">
                            <input type="text" placeholder="Название проекта" onChange={(event) => handleChange(event, setName)} />
                        </div>
                        {nameError && (
                            <p className="danger">{nameError}</p>
                        )}
                        <p className="tr">Автор: {login}</p>
                        <p className ="desc">Описание проекта:</p>
                        <div className="description">
                            <textarea name="description" rows={12} onChange={(event) => handleChangeDescription(event, setDescription)}></textarea>
                        </div>
                        {descriptionError && (
                            <p className="danger">{descriptionError}</p>
                        )}
                        <p>Тэги:</p>
                        <div className="tags-container">
                            {tags.map((tag, index) => (
                                <div key={index} className="tag">
                                    <span onClick={() => {
                                        const newTag = prompt("Изменить тэг", tag);
                                        if (newTag) {
                                            handleEditTag({index: index, newTag: newTag});
                                        }
                                    }}>{tag}</span>
                                </div>
                            ))}
                            {tags.length < 5 && (
                                <div className="tags">
                                    <input
                                        type="text"
                                        value={newTag}
                                        placeholder="Добавить тэг"
                                        onChange={(event) => setNewTag(event.target.value)}
                                        onKeyPress={handleTagKeyPress}
                                    />
                                    <button onClick={handleAddTag}>+</button>
                                </div>
                            )}
                        </div>

                    </div>
                </main>

                <footer>
                    <div className="options">
                        <div className="type">
                            <label>
                                <input
                                    type="radio"
                                    value="private"
                                    checked={type === "private"}
                                    onChange={handleTypeChange}
                                />
                                Private
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="public"
                                    checked={type === "public"}
                                    onChange={handleTypeChange}
                                />
                                Public
                            </label>
                        </div>
                        <div className="save-button">
                            <CButton
                                config={{
                                    UIConfig: {variant: Variant.PRIMARY},
                                    text: 'Сохранить'
                                }}
                                onClick={submit}
                            />
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );

};

export default ProjectCreate;
