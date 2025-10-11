import { PlaceablesLayerPointerEvent } from "../../../../foundry/client/canvas/layers/base/placeables-layer.mts";
import { Point } from "../../../../foundry/common/_types.mts";
import { TokenPF2e } from '../index.ts';
declare class TokenLayerPF2e<TObject extends TokenPF2e> extends fc.layers.TokenLayer<TObject> {
    #private;
    constructor();
    /** Prevent redirection of event to `Ruler` when ctrl key is pressed. */
    protected _onClickLeft(event: PlaceablesLayerPointerEvent<TObject>): void;
    /** Cycle Z indices of a hovered token stack. */
    cycleStack(): boolean;
    refreshDistanceLine(): void;
    refreshDistanceLine(from: TObject, to: TObject): Point;
}
export { TokenLayerPF2e };
