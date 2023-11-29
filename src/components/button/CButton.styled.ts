import styled from "styled-components";
import { CButtonUIConfig } from "./CButton.types";
import { colors } from "../../styles/ts/colors";
import { Variant } from "../../styles/ts/types";

function getColorByVariant(variant: Variant): string {
    const defaultColor = colors.primary;

    const colorsMap: Map<Variant, string> = new Map([
        [Variant.PRIMARY, colors.primary],
        [Variant.SECONDARY, colors.secondary],
    ]);

    return colorsMap.get(variant) || defaultColor;
}

function getAccentColorByVariant(variant: Variant): string {
    const colorsMap: Map<Variant, string> = new Map([
        [Variant.PRIMARY, colors.accentPrimary],
        [Variant.SECONDARY, colors.accentSecondary],
    ]);

    return colorsMap.get(variant) || getColorByVariant(variant);
}

export const StyledButton = styled.button<{ config: CButtonUIConfig }>`
  position: relative;
  align-items: center;
  display: inline-flex;
  gap: 10px;
  height: 57px;
  justify-content: center;
  padding: 14px 18px;
  width: 221px;
  margin-top: 20px;
  border-radius: 10px;
  border: none; /* Optional: Remove default button border */
  cursor: pointer;
  outline: none; /* Remove outline on focus */
  background: ${(props) =>
          getColorByVariant(props.config?.variant || Variant.PRIMARY)};
  overflow: hidden;
`;

export const ButtonText = styled.div<{ config: CButtonUIConfig }>`
  position: relative;
  z-index: 1;
  color: ${(props) =>
         getAccentColorByVariant(props.config.variant || Variant.PRIMARY)};
  font-family: 'Inter', serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.48px;
  word-wrap: break-word;
`;
