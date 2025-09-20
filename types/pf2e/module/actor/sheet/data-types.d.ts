import { ActorPF2e } from '../base.ts';
import { TraitViewData } from '../data/base.ts';
import { ActorSizePF2e } from '../data/size.ts';
import { InventoryBulk } from '../inventory/index.ts';
import { FormSelectOption } from "../../../../foundry/client/applications/forms/fields.mts";
import { AppV1RenderOptions } from "../../../../foundry/client/appv1/api/application-v1.mts";
import { ActorSheetData } from "../../../../foundry/client/appv1/sheets/actor-sheet.mts";
import { ItemUUID } from "../../../../foundry/common/documents/_module.mts";
import { PhysicalItemPF2e } from '../../item/index.ts';
import { Frequency } from '../../item/base/data/index.ts';
import { RawCoins } from '../../item/physical/data.ts';
import { RollOptionToggle } from '../../rules/synthetics.ts';
import { SheetOptions } from '../../sheet/helpers.ts';
interface InventoryItem<TItem extends PhysicalItemPF2e = PhysicalItemPF2e> {
    item: TItem;
    /** Item size if it causes any weight difference relative to the actor */
    itemSize?: ActorSizePF2e | null;
    isContainer: boolean;
    canBeEquipped: boolean;
    /** Bulk for each item is shown on an individual basis from merchant sheets */
    unitBulk: string | null;
    isInvestable: boolean;
    isSellable: boolean;
    hasCharges: boolean;
    heldItems?: InventoryItem[] | null;
    notifyEquip?: boolean;
    notifyInvest?: boolean;
    /** Whether the item should be hidden if the user isn't the owner */
    hidden: boolean;
}
interface CoinDisplayData {
    value: number;
    label: string;
}
export type CoinageSummary = {
    [K in keyof RawCoins]?: CoinDisplayData;
};
interface SheetItemList {
    label: string;
    types: string[];
    items: InventoryItem[];
}
interface SheetInventory {
    sections: SheetItemList[];
    bulk: InventoryBulk;
    showValueAlways: boolean;
    showUnitBulkPrice: boolean;
    hasStowedWeapons: boolean;
    hasStowingContainers: boolean;
    invested?: {
        value: number;
        max: number;
    } | null;
}
interface ActorSheetDataPF2e<TActor extends ActorPF2e> extends ActorSheetData<TActor> {
    data: TActor["system"];
    canDistributeCoins?: {
        enabled: boolean;
    } | null;
    enrichedContent: Record<string, string>;
    inventory: SheetInventory;
    isLootSheet: boolean;
    isTargetFlatFooted: boolean;
    toggles: Record<string, RollOptionToggle[]>;
    totalCoinage: CoinageSummary;
    totalCoinageGold: string;
    totalWealth: RawCoins;
    totalWealthGold: string;
    traits: SheetOptions;
    user: {
        isGM: boolean;
    };
    publicationLicenses: FormSelectOption[];
}
interface AbilityViewData {
    uuid: ItemUUID;
    id: string;
    name: string;
    img: string;
    traits: TraitViewData[];
    glyph: string | null;
    frequency: Frequency | null;
    usable: boolean;
    has: {
        aura: boolean;
        deathNote: boolean;
        selfEffect: boolean;
    };
}
interface ActorSheetRenderOptionsPF2e extends AppV1RenderOptions {
    /** What tab to switch to when rendering the sheet */
    tab?: string;
}
export type { AbilityViewData, ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e, InventoryItem, SheetInventory };
