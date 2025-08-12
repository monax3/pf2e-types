import { ActorPF2e } from '../../../base.ts';
import { CraftingAbility } from '../../crafting/ability.ts';
import { CharacterPF2e } from '../../document.ts';
import { ResourceData } from '../../../creature/index.ts';
import { ApplicationConfiguration, ApplicationRenderOptions } from "../../../../../../foundry/client/applications/_types.mts";
import { ItemUUID } from "../../../../../../foundry/common/documents/_module.mts";
import { AbilityItemPF2e, FeatPF2e, PhysicalItemPF2e } from '../../../../item/index.ts';
import { ItemType, TraitChatData } from '../../../../item/base/data/index.ts';
import { Rarity } from '../../../../data.ts';
import { SvelteApplicationRenderContext } from '../../../../sheet/mixin.svelte.ts';
import { default as MiniSearch } from 'minisearch';
interface FormulaPickerConfiguration extends ApplicationConfiguration {
    actor: CharacterPF2e;
    ability: CraftingAbility;
    item?: FeatPF2e | AbilityItemPF2e;
    mode: "craft" | "prepare";
}
declare const FormulaPicker_base: AbstractMixin<typeof fa.api.ApplicationV2, import('../../../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base, typeof import('../../../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base & typeof fa.api.ApplicationV2>;
/** Creates a formula picker dialog that resolves with the selected item */
declare class FormulaPicker extends FormulaPicker_base {
    #private;
    static DEFAULT_OPTIONS: {
        id: string;
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            contentClasses: string[];
            resizable: boolean;
        };
        onSelect: () => void;
        onDeselect: () => void;
    };
    options: FormulaPickerConfiguration;
    root: import('svelte/legacy').LegacyComponentType;
    selection: PhysicalItemPF2e | null;
    constructor(options: Partial<FormulaPickerConfiguration>);
    get title(): string;
    /** Overriden to re-render when the actor re-renders */
    _onFirstRender(context: object, options: ApplicationRenderOptions): void;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
    resolveSelection(): Promise<PhysicalItemPF2e | null>;
    protected _prepareContext(): Promise<FormulaPickerContext>;
}
interface FormulaPickerContext extends SvelteApplicationRenderContext {
    actor: ActorPF2e;
    ability: CraftingAbility;
    mode: "craft" | "prepare";
    onSelect: (uuid: ItemUUID) => void;
    onDeselect: (uuid: ItemUUID) => void;
    searchEngine: MiniSearch<Pick<PhysicalItemPF2e, "id" | "name">>;
    state: {
        name: string;
        resource: ResourceData | null;
        prompt: string;
        sections: FormulaSection[];
    };
}
interface FormulaSection {
    level: number;
    formulas: {
        item: FormulaViewData;
        /** The batch size or quantity prepared depending on context */
        quantity: number;
        selected: boolean;
    }[];
}
interface FormulaViewData {
    id: string;
    uuid: ItemUUID;
    type: ItemType;
    img: string;
    name: string;
    traits: TraitChatData[];
    level: number | null;
    rarity: Rarity | null;
}
export { FormulaPicker };
export type { FormulaPickerContext };
