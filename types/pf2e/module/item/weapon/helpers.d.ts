import { WeaponPF2e } from './document.ts';
/** Upgrade a trait with a dice annotation, if possible, or otherwise return the original trait. */
declare function upgradeWeaponTrait<TTrait extends string>(trait: TTrait): TTrait;
/** Apply a two-hand trait to a weapon's damage dice. */
declare function processTwoHandTrait(weapon: WeaponPF2e): void;
export { processTwoHandTrait, upgradeWeaponTrait };
