import { HandlebarsRenderOptions } from "../../../../foundry/client/applications/api/handlebars-application.mts";
import { ContextMenuEntry } from "../../../../foundry/client/applications/ux/context-menu.mts";
import { ItemPF2e } from '../../item/index.ts';
/** Extend ItemDirectory to show more information */
export declare class ItemDirectoryPF2e extends fa.sidebar.tabs.ItemDirectory<ItemPF2e<null>> {
    #private;
    protected static _entryPartial: string;
    static DEFAULT_OPTIONS: DeepPartial<fa.sidebar.DocumentDirectoryConfiguration>;
    protected _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
    /** Add `ContextMenuEntry` to attach physical items */
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
