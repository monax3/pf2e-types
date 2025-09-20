import { TokenMeasureMovementPathOptions } from "../../../../../foundry/client/_types.mts";
import { TokenMovementCostFunction } from "../../../../../foundry/client/documents/_types.mts";
import { TokenDocumentPF2e } from '../../../scene/index.ts';
export declare class TerrainDataPF2e extends foundry.data.TerrainData {
    #private;
    /** Make terrain difficulty additive instead of multiplicative. */
    static getMovementCostFunction(token: TokenDocumentPF2e, options?: TokenMeasureMovementPathOptions): TokenMovementCostFunction;
}
