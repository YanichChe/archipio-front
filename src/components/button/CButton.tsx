import { ButtonText, StyledButton } from "./CButton.styled";
import { CButtonConfig } from "./CButton.types";

export function CButton({ config, onClick }: { config: CButtonConfig, onClick: any }) {
    return (
        <StyledButton config={config.UIConfig} onClick={onClick}>
            <ButtonText config={config.UIConfig} >{config.text}</ButtonText>
        </StyledButton>
    );
}
