import { ApplicationRenderContext } from "../../../foundry/client/applications/_module.mjs";
import { ItemPF2e, PhysicalItemPF2e } from '../item/index.ts';
import { UserPF2e } from '../user/document.ts';
declare const ItemAttacher_base: AbstractMixin<typeof fa.api.ApplicationV2, fa.api.HandlebarsApplication, typeof fa.api.HandlebarsApplication & typeof fa.api.ApplicationV2>;
/** A prompt for the user to select an item to receive an attachment */
declare class ItemAttacher extends ItemAttacher_base {
    #private;
    constructor({ item }: {
        item: PhysicalItemPF2e;
    });
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    item: PhysicalItemPF2e;
    choices: PhysicalItemPF2e[];
    get title(): string;
    protected _canRender(options: fa.ApplicationRenderOptions): boolean | void;
    _prepareContext(): Promise<ItemAttacherContext>;
}
interface ItemAttacherContext extends ApplicationRenderContext {
    choices: {
        label: string;
        value: number;
    }[];
    /** An item pertinent to the selection being made */
    item: ItemPF2e;
    user: UserPF2e;
    requiresCrafting: boolean;
}
export { ItemAttacher };
