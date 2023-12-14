// @ts-ignore
import { Observer } from "mobx-react";
import styled from "styled-components";
import Form from "./Form";

export function Profile() {
    const SecurityContainerStyled = styled.div`
      position: absolute;
      width: 100%;
      height: 100%;
      display: table-column;
      justify-content: center;
      align-items: center;
    `;

    return (
        <Observer>
            {() => (
                <SecurityContainerStyled>
                    <Form />
                </SecurityContainerStyled>
            )}
        </Observer>
    );
}
