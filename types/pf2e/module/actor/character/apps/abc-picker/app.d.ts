import { CharacterPF2e } from '../../../index.ts';
import { ImageFilePath } from "../../../../../../foundry/common/constants.mts";
import { ItemUUID } from "../../../../../../foundry/common/documents/_module.mts";
import { ItemType } from '../../../../item/base/data/index.ts';
import { Rarity } from '../../../../data.ts';
import { SvelteApplicationRenderContext } from '../../../../sheet/mixin.svelte.ts';
type AhBCDType = Extract<ItemType, "ancestry" | "heritage" | "background" | "class" | "deity">;
interface ABCPickerConfiguration extends fa.ApplicationConfiguration {
    actor: CharacterPF2e;
    itemType: AhBCDType;
}
interface ABCItemRef {
    name: string;
    originalName?: string;
    img: ImageFilePath;
    uuid: ItemUUID;
    rarity?: {
        slug: Rarity;
        label: string;
    };
    source: {
        name: string;
        /** Whether the source comes from an item's publication data or is simply the providing module */
        publication: boolean;
    };
    hidden: boolean;
}
interface ABCPickerContext extends SvelteApplicationRenderContext {
    actor: CharacterPF2e;
    foundryApp: ABCPicker;
    state: {
        prompt: string;
        itemType: AhBCDType;
        items: ABCItemRef[];
    };
}
declare const ABCPicker_base: AbstractMixin<AbstractConstructorOf<fa.api.ApplicationV2<fa.ApplicationConfiguration, fa.ApplicationRenderOptions, object>> & {
    DEFAULT_OPTIONS: DeepPartial<ABCPickerConfiguration>;
}, import('../../../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base, typeof import('../../../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base & typeof fa.api.ApplicationV2>;
/** A `Compendium`-like application for presenting A(H)BCD options for a character */
declare class ABCPicker extends ABCPicker_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ABCPickerConfiguration>;
    options: ABCPickerConfiguration;
    protected root: import('svelte/legacy').LegacyComponentType;
    get title(): string;
    protected _initializeApplicationOptions(options: Partial<ABCPickerConfiguration>): ABCPickerConfiguration;
    protected _prepareContext(): Promise<ABCPickerContext>;
}
export { ABCPicker, type ABCPickerContext };
