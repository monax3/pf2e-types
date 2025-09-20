import { ActorPF2e } from '../../base.ts';
import { RawCoins } from '../../../item/physical/data.ts';
import appv1 = foundry.appv1;
interface AddCoinsFormData extends RawCoins {
    combineStacks: boolean;
}
/**
 * @category Other
 */
export declare class AddCoinsPopup extends appv1.api.FormApplication<ActorPF2e> {
    static get defaultOptions(): appv1.api.FormApplicationOptions;
    _updateObject(_event: Event, formData: Record<string, unknown> & AddCoinsFormData): Promise<void>;
}
export {};
