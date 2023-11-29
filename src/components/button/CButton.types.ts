import { Variant } from "../../styles/ts/types";

export type CButtonUIConfig = {
    variant?: Variant,
}

export type CButtonConfig = {
    UIConfig: CButtonUIConfig,
    text: string
}
