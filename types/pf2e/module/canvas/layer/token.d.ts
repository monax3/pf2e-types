import { PlaceablesLayerPointerEvent } from "../../../../foundry/client/canvas/layers/base/placeables-layer.mts";
import { TokenPF2e } from '../index.ts';
declare class TokenLayerPF2e<TObject extends TokenPF2e> extends fc.layers.TokenLayer<TObject> {
    #private;
    /** Prevent redirection of event to `Ruler` when ctrl key is pressed. */
    protected _onClickLeft(event: PlaceablesLayerPointerEvent<TObject>): void;
    /** Cycle Z indices of a hovered token stack. */
    cycleStack(): boolean;
    clearDistanceLine(): void;
    renderDistanceLine(from: TObject, to: TObject): void;
    protected _activate(): void;
    protected _deactivate(): void;
    protected _tearDown(options?: object): Promise<void>;
}
export { TokenLayerPF2e };
