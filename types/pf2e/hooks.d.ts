import { ActorPF2e } from './module/actor/index.ts';
import { ResourceData } from './module/actor/creature/index.ts';
import { Rolled } from "../foundry/client/dice/_module.mjs";
import { CombatantPF2e } from './module/encounter/combatant.ts';
import { EncounterPF2e } from './module/encounter/document.ts';
import { CheckRoll } from './module/system/check/roll.ts';
import { DamageRoll } from './module/system/damage/roll.ts';
import { WorldClockSettings } from './module/system/settings/world-clock.ts';
declare module "../foundry/client/helpers/hooks.mjs" {
    interface SystemApplications {
        WorldClockSettings: WorldClockSettings;
    }

    interface AllHooks {
        "pf2e.startTurn": (combatant: Maybe<CombatantPF2e>, encounter: EncounterPF2e, userId: string) => HookReturn;
        "pf2e.endTurn": (combatant: Maybe<CombatantPF2e>, encounter: EncounterPF2e, userId: string) => HookReturn;
        "pf2e.preReroll": (
            oldRoll: Rolled<CheckRoll>,
            newRoll: CheckRoll,
            resource: Maybe<ResourceData>,
            keep?: "new" | "lower" | "higher",
        ) => HookReturn;
        "pf2e.reroll": (
            oldRoll: Rolled<CheckRoll>,
            newRoll: Rolled<CheckRoll>,
            resource: Maybe<ResourceData>,
            keep?: "new" | "lower" | "higher",
        ) => HookReturn;
        "pf2e.damageRoll": (roll: Rolled<DamageRoll>) => HookReturn;
        "pf2e.systemReady": () => HookReturn;
        "pf2e.restForTheNight": (actor: ActorPF2e) => HookReturn;
        migrationComplete: () => HookReturn;
        "babele.ready": () => HookReturn;
    }
}
