import React, {useEffect, useState} from "react";
import { Variant } from "../../../styles/ts/types";
import { CButton } from "../../../components/button/CButton";
import AuthService from "../../../services/AuthService";
import ProfileService from "../../../API/ProfileService";
import AvatarEditor from "react-avatar-editor";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const PictureChange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isImageEdited, setIsImageEdited] = useState(false);
    const [image, setImage] = useState(null);
    const [editor, setEditor] = useState<AvatarEditor | null>(null);



    useEffect(() => {
        if (!isOpen) {
            onClose();
        }
    }, [isOpen]);

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

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

    }

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
            onClose();
        }
    }


    if (!isOpen) {
        return null;
    }

    return (
        <div className="shadow">
            <div className="logout-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div>
                <input type="file" accept=".jpg, .png" onChange={handleImageChange} />
                {image && !isImageEdited && (
                    <AvatarEditor
                        ref={(e) => setEditor(e)}
                        image={image}
                        width={400}
                        height={400}
                        border={0}
                        color={[255, 255, 255, 0.6]}
                        scale={1.2}
                        borderRadius={200}
                    />
                )}
                <button onClick={handleSave} className="save-button">Save</button>
                {editedImage && (isImageEdited && <img className="avatar" src={editedImage} alt="Edited" />
                )}
                </div>
            </div>
        </div>
    );
};

export default PictureChange;
