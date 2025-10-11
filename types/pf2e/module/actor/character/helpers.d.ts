import { ActorPF2e, CharacterPF2e } from '../index.ts';
import { AttackTraitHelpers } from '../creature/helpers.ts';
import { Modifier } from '../modifiers.ts';
import { AbilityItemPF2e, ArmorPF2e, WeaponPF2e } from '../../item/index.ts';
import { ZeroToFour } from '../../data.ts';
/** Handle weapon traits that introduce modifiers or add other weapon traits */
declare class PCAttackTraitHelpers extends AttackTraitHelpers {
    static adjustWeapon(weapon: WeaponPF2e): void;
    static createAttackModifiers({ item, domains }: CreateAttackModifiersParams): Modifier[];
}
/** Make a PC Clumsy 1 when wielding an oversized weapon */
declare function imposeOversizedWeaponCondition(actor: CharacterPF2e): void;
interface CreateAttackModifiersParams {
    item: AbilityItemPF2e<CharacterPF2e> | WeaponPF2e<CharacterPF2e>;
    domains: string[];
}
/** Get the proficiency rank of of a weapon or armor for a PC. */
declare function getItemProficiencyRank(actor: CharacterPF2e, item: ArmorPF2e | WeaponPF2e, itemOptions?: Set<string>): ZeroToFour;
/** Create a penalty for attempting to Force Open without a crowbar or equivalent tool */
declare function createForceOpenPenalty(actor: CharacterPF2e, domains: string[]): Modifier;
declare function createShoddyPenalty(actor: ActorPF2e, item: WeaponPF2e | ArmorPF2e | null, domains: string[]): Modifier | null;
/**
 * Create a penalty for wearing armor with the "ponderous" trait
 * "While wearing the armor, you take a –1 penalty to initiative checks. If you don't meet the armor's required Strength
 * score, this penalty increases to be equal to the armor's check penalty if it's worse."
 */
declare function createPonderousPenalty(actor: CharacterPF2e): Modifier | null;
export { createForceOpenPenalty, createPonderousPenalty, createShoddyPenalty, getItemProficiencyRank, imposeOversizedWeaponCondition, PCAttackTraitHelpers, };
