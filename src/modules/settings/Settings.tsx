// @ts-ignore
import { Observer } from "mobx-react";
import styled from "styled-components";
import Form from "./Form";

export function Settings() {
    const SecurityContainerStyled = styled.div`
      position: absolute;
      width: 540px;
      height: max-content;
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
