import { DataFieldOptions } from "../../../../../foundry/common/data/_types.mts";
import { ItemPF2e } from '../../../item/index.ts';
import { ItemSourcePF2e, ItemType } from '../../../item/base/data/index.ts';
import { ItemTrait } from '../../../item/base/types.ts';
import { PersistentDamageValueSchema } from '../../../item/condition/data.ts';
import { PredicateField, SlugField, StrictNumberField } from '../../../system/schema-data-fields.ts';
import { AELikeChangeMode } from '../ae-like.ts';
import { RuleElementPF2e } from '../index.ts';
import fields = foundry.data.fields;
import validation = foundry.data.validation;
/** A `SchemaField` reappropriated for validation of specific item alterations */
declare class ItemAlterationHandler<TSchema extends AlterationSchema> extends fields.SchemaField<TSchema> {
    #private;
    operableOnInstances: boolean;
    operableOnSource: boolean;
    /** A registered handler function for the item alteration. The validation should be performed inside */
    handle: (data: AlterationApplicationData) => void;
    constructor(options: AlterationFieldOptions<TSchema> & {
        fields: TSchema;
    });
    /**
     * A type-safe affirmation of full validity of an alteration _and_ its applicable to a particular item
     * Errors will bubble all the way up to the originating parent rule element
     */
    isValid(data: {
        item: ItemPF2e | ItemSourcePF2e;
        alteration: MaybeAlterationData;
    }): data is {
        item: ItemOrSource<fields.SourceFromSchema<TSchema>["itemType"]>;
        rule: RuleElementPF2e;
        alteration: fields.SourceFromSchema<TSchema>;
    };
}
type ItemOrSource<TItemType extends ItemType> = InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]> | InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]>["_source"];
type MaybeAlterationData = {
    mode: string;
    itemType: string;
    value: unknown;
};
interface AlterationApplicationData {
    item: ItemPF2e | ItemSourcePF2e;
    rule: RuleElementPF2e;
    alteration: MaybeAlterationData;
}
declare const ITEM_ALTERATION_HANDLERS: {
    "ac-bonus": ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "area-size": ItemAlterationHandler<{
        itemType: fields.StringField<"spell", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-max": ItemAlterationHandler<{
        itemType: fields.StringField<"effect", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "downgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-value": ItemAlterationHandler<{
        itemType: fields.StringField<"condition" | "effect", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    bulk: ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, number, true, false, false>;
    }>;
    category: ItemAlterationHandler<{
        itemType: fields.StringField<"armor", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<"medium" | "light" | "heavy", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "check-penalty": ItemAlterationHandler<{
        itemType: fields.StringField<"armor", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "damage-dice-faces": ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<6 | 4 | 8 | 10 | 12, 6 | 4 | 8 | 10 | 12, true, true, true>;
    }>;
    "damage-dice-number": ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "damage-type": ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    /** The passive defense targeted by an attack spell */
    "defense-passive": ItemAlterationHandler<{
        itemType: fields.StringField<"spell", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<"ac" | "fortitude-dc" | "reflex-dc" | "will-dc", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    description: ItemAlterationHandler<{
        itemType: fields.StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "add", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.ArrayField<DescriptionElementField, fields.SourceFromSchema<{
            title: fields.StringField<string, string, false, true, true>;
            text: fields.StringField<string, string, true, false, false>;
            divider: fields.BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>[], fields.ModelPropsFromSchema<{
            title: fields.StringField<string, string, false, true, true>;
            text: fields.StringField<string, string, true, false, false>;
            divider: fields.BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>[], true, false, false>;
    }>;
    "dex-cap": ItemAlterationHandler<{
        itemType: fields.StringField<"armor", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "focus-point-cost": ItemAlterationHandler<{
        itemType: fields.StringField<"spell", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "add", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    group: ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    hardness: ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "hp-max": ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "material-type": ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<"abysium" | "adamantine" | "dawnsilver" | "djezet" | "duskwood" | "inubrix" | "noqual" | "orichalcum" | "siccatite" | "silver" | "cold-iron" | "dragonhide" | "dreamweb" | "grisantian-pelt" | "keep-stone" | "peachwood" | "sisterstone" | "sisterstone-dusk" | "sisterstone-scarlet" | "sloughstone" | "sovereign-steel" | "warpglass", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "pd-recovery-dc": ItemAlterationHandler<{
        itemType: fields.StringField<"condition", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "persistent-damage": ItemAlterationHandler<{
        itemType: fields.StringField<"condition", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.SchemaField<PersistentDamageValueSchema, fields.SourceFromSchema<PersistentDamageValueSchema>, fields.ModelPropsFromSchema<PersistentDamageValueSchema>, true, false, true>;
    }>;
    rarity: ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<"common" | "uncommon" | "rare" | "unique", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "range-increment": ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "multiply" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "range-max": ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "multiply" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-max": ItemAlterationHandler<{
        itemType: fields.StringField<"action" | "feat", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-per": ItemAlterationHandler<{
        itemType: fields.StringField<"action" | "feat", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "other-tags": ItemAlterationHandler<{
        itemType: fields.StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: SlugField<true, false, boolean>;
    }>;
    name: ItemAlterationHandler<{
        itemType: fields.StringField<ItemType, ItemType, true, false, false>;
        mode: fields.StringField<"override", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    potency: ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    resilient: ItemAlterationHandler<{
        itemType: fields.StringField<"armor", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "speed-penalty": ItemAlterationHandler<{
        itemType: fields.StringField<"armor" | "shield", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    strength: ItemAlterationHandler<{
        itemType: fields.StringField<"armor", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade" | "downgrade" | "add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    striking: ItemAlterationHandler<{
        itemType: fields.StringField<"weapon", ItemType, true, false, false>;
        mode: fields.StringField<"override" | "upgrade", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    traits: ItemAlterationHandler<{
        itemType: fields.StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "effect" | "feat" | "heritage" | "kit" | "melee" | "spell" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: fields.StringField<"add" | "subtract" | "remove", "override" | "upgrade" | "downgrade" | "multiply" | "add" | "subtract" | "remove", true, false, false>;
        value: fields.StringField<ItemTrait, ItemTrait, true, false, false>;
    }>;
};
interface AlterationFieldOptions<TSchema extends AlterationSchema, TSourceProp extends fields.SourceFromSchema<TSchema> = fields.SourceFromSchema<TSchema>> extends DataFieldOptions<TSourceProp, true, false, false> {
    validateForItem?: (item: ItemPF2e | ItemSourcePF2e, alteration: MaybeAlterationData) => validation.DataModelValidationFailure | void;
    /** Whether this alteration can be used with an `ItemPF2e` instance */
    operableOnInstances?: boolean;
    /** Whether this alteration can be used with item source data */
    operableOnSource?: boolean;
    handle: (this: ItemAlterationHandler<TSchema>, data: AlterationApplicationData) => void;
}
type AlterationSchema = {
    itemType: fields.StringField<ItemType, ItemType, true, false, false>;
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    value: fields.DataField<Exclude<JSONValue, undefined>, Exclude<JSONValue, undefined>, true, boolean, boolean>;
};
type DescriptionElementField = fields.SchemaField<{
    title: fields.StringField<string, string, false, true, true>;
    text: fields.StringField<string, string, true, false, false>;
    divider: fields.BooleanField<boolean, boolean, false, false, true>;
    predicate: PredicateField<false>;
}>;
export { ITEM_ALTERATION_HANDLERS, ItemAlterationHandler };
export type { AlterationApplicationData, AlterationFieldOptions, AlterationSchema };
