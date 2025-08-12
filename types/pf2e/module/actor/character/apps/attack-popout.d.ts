import { ApplicationV1HeaderButton } from "../../../../../foundry/client/appv1/api/application-v1.mts";
import { ActorSheetOptions } from "../../../../../foundry/client/appv1/sheets/actor-sheet.mts";
import { EffectTrait } from '../../../item/abstract-effect/types.ts';
import { CharacterStrike } from '../data.ts';
import { CharacterPF2e } from '../document.ts';
import { CharacterSheetPF2e, CharacterSheetData } from '../sheet.ts';
declare class AttackPopout<TActor extends CharacterPF2e> extends CharacterSheetPF2e<TActor> {
    #private;
    type: "strike" | "blast";
    get template(): string;
    get id(): string;
    static get defaultOptions(): ActorSheetOptions;
    get label(): string | null;
    constructor(object: TActor, options: AttackPopoutOptions);
    getData(options: ActorSheetOptions): Promise<AttackPopoutData<TActor>>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _getHeaderButtons(): ApplicationV1HeaderButton[];
}
interface BaseAttackPopoutOptions extends Partial<ActorSheetOptions> {
    type: string;
}
interface StrikePopoutOptions extends BaseAttackPopoutOptions {
    type: "strike";
    strikeSlug?: string;
    strikeItemId?: string;
}
interface BlastPopoutOptions extends BaseAttackPopoutOptions {
    type: "blast";
    elementTrait?: EffectTrait;
}
type AttackPopoutOptions = StrikePopoutOptions | BlastPopoutOptions;
interface AttackPopoutData<TActor extends CharacterPF2e> extends CharacterSheetData<TActor> {
    strike?: CharacterStrike;
    strikeIndex?: number;
    popoutType: AttackPopoutOptions["type"];
}
export { AttackPopout };
