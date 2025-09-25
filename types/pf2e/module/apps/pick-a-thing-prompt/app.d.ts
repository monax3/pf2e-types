import { ApplicationV2 } from "../../../../foundry/client/applications/api/_module.mjs";
import { ItemPF2e } from '../../item/index.ts';
import { SvelteApplicationRenderContext } from '../../sheet/mixin.svelte.ts';
import { Predicate } from '../../system/predication.ts';
declare const PickAThingPrompt_base: AbstractMixin<AbstractConstructorOf<ApplicationV2<fa.ApplicationConfiguration, fa.ApplicationRenderOptions, fa.ApplicationRenderContext>> & {
    DEFAULT_OPTIONS: DeepPartial<PickAThingPromptConfiguration>;
}, import('../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base, typeof import('../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base & typeof ApplicationV2>;
declare class PickAThingPrompt<TThing extends string | number | object> extends PickAThingPrompt_base {
    #private;
    constructor(data: PickAThingPromptConfiguration<TThing>);
    static DEFAULT_OPTIONS: {
        window: {
            icon: string;
        };
    };
    root: import('svelte/legacy').LegacyComponentType;
    item: ItemPF2e;
    /** The prompt statement to present the user in this application's window */
    prompt: string;
    choices: PickableThing<TThing>[];
    /** Does this choice set contain items? If true, an item-drop zone may be added */
    containsItems: boolean;
    /** A predicate validating a dragged & dropped item selection */
    allowedDrops: {
        label: string | null;
        predicate: Predicate;
    } | null;
    allowNoSelection: boolean;
    /** The current value, which is used in the resolve when it closes */
    selection: PickableThing<TThing> | null;
    protected _prepareContext(): Promise<PickAThingRenderContext<TThing>>;
    /** Return early if there is only one choice */
    resolveSelection(): Promise<PickableThing<string | number | object> | null>;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
}
interface PickAThingPromptConfiguration<TThing extends string | number | object = string | number | object> extends DeepPartial<fa.ApplicationConfiguration>, DeepPartial<fa.ApplicationRenderContext> {
    prompt: string;
    item: ItemPF2e;
    title: string;
    containsItems?: boolean;
    choices: PickableThing<TThing>[];
    allowedDrops: {
        label: string | null;
        predicate: Predicate;
    } | null;
    allowNoSelection?: boolean;
}
interface PickableThing<T extends string | number | object = string | number | object> {
    value: T;
    label: string;
    img?: string;
    domain?: string[];
    predicate?: Predicate;
}
interface PickAThingRenderContext<T extends string | number | object = string | number | object> extends SvelteApplicationRenderContext {
    updateSelection: (option: PickableThing<T> | null) => void;
    resolve: (option: PickableThing<T> | null) => void;
    testAllowedDrop: (option: ItemPF2e) => boolean;
    state: {
        prompt: string;
        includeDropZone: boolean;
        allowNoSelection: boolean;
        selectMenu: boolean;
        containsItems: boolean;
        choices: PickableThing<T>[];
    };
}
export { PickAThingPrompt };
export type { PickableThing, PickAThingRenderContext };
