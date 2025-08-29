import { TokenMeasureMovementPathOptions } from "../../../../../foundry/client/_types.mts";
import { TokenMovementCostFunction } from "../../../../../foundry/client/documents/_types.mts";
export declare class TerrainDataPF2e extends foundry.data.TerrainData {
    /** Make terrain difficulty additive instead of multiplicative. */
    static getMovementCostFunction(token: TokenDocument, options?: TokenMeasureMovementPathOptions): TokenMovementCostFunction;
}
