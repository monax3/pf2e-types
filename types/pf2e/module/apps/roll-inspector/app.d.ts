import { RawDamageDice, RawModifier } from '../../actor/modifiers.ts';
import { ApplicationConfiguration } from "../../../../foundry/client/applications/_types.mts";
import { ChatContextFlag } from '../../chat-message/data.ts';
import { ChatMessagePF2e } from '../../chat-message/document.ts';
import { SvelteApplicationRenderContext } from '../../sheet/mixin.svelte.ts';
declare const RollInspector_base: AbstractMixin<typeof fa.api.ApplicationV2, import('../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base, typeof import('../../sheet/mixin.svelte.ts').SvelteApplicationMixin_base & typeof fa.api.ApplicationV2>;
declare class RollInspector extends RollInspector_base {
    static DEFAULT_OPTIONS: {
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            title: string;
            resizable: boolean;
        };
    };
    protected root: import('svelte/legacy').LegacyComponentType;
    message: ChatMessagePF2e;
    constructor(options: DeepPartial<ApplicationConfiguration> & {
        message: ChatMessagePF2e;
    });
    protected _prepareContext(): Promise<RollInspectorContext>;
}
interface RollInspectorContext extends SvelteApplicationRenderContext {
    state: RollInspectorState;
}
interface RollInspectorState {
    context: ChatContextFlag;
    domains: string[];
    modifiers: RawModifier[];
    dice: RawDamageDice[];
    rollOptions: string[];
    contextualOptions: {
        header: string;
        options: string[];
    }[];
}
export { RollInspector };
export type { RollInspectorContext };
