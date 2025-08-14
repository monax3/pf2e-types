import { ClockwiseSweepPolygon } from "../../../../foundry/client/canvas/geometry/_module.mts";
import { TokenPF2e } from '../token/index.ts';
/** Subclassed to include hearing detection */
declare class PointVisionSourcePF2e<TObject extends TokenPF2e = TokenPF2e> extends foundry.canvas.sources
    .PointVisionSource<TObject> {
    hearing?: ClockwiseSweepPolygon;
    protected _createShapes(): void;
}
export { PointVisionSourcePF2e };
