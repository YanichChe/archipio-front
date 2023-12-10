import React, {useState} from "react";
// @ts-ignore
import {observer} from "mobx-react";
import {CButton} from "../../components/button/CButton";
import {Variant} from "../../styles/ts/types";
import Logout from "../logout/Logout";
import AuthService from "../../services/AuthService";

const Form = observer(() => {
    const [modalOpen, setModalOpen] = useState(false);

        const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("meow");
        setModalOpen(true);
    }

    return (
        <div className="form">
            <CButton
                config={{
                    UIConfig: { variant: Variant.PRIMARY },
                    text: 'Log out'
                }}
                onClick={submit} />
            <Logout isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {/* Использовать компонент Logout */}
        </div>
    );
});

export default Form;
