// @ts-ignore
import { Observer } from "mobx-react";
import styled from "styled-components";
import Form from "./Form";

export function Registration() {
    const SecurityContainerStyled = styled.div`
      width: 540px;
      height: max-content;
      position: relative;
      display: flex;
      justify-content: center;
    `;

    return (
        <Observer>
            {() => (
                <SecurityContainerStyled>
                    <Form/>
                </SecurityContainerStyled>
            )}
        </Observer>
    );
}
