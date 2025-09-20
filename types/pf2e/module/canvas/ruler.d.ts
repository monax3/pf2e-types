import { ElevatedPoint } from "../../../foundry/common/_types.mts";
export declare class RulerPF2e extends fc.interaction.Ruler {
    get path(): readonly Readonly<ElevatedPoint>[];
    set path(value: ElevatedPoint[]);
}
