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
        setModalOpen(true);
        console.log("meow");
    }

    return (
        <div className="form">
            <CButton
                config={{
                    UIConfig: { variant: Variant.PRIMARY },
                    text: 'Log out'
                }}
                onClick={submit} />
            <Logout isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {}
        </div>
    );
});

export default Form;
