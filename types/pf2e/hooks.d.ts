import { ActorPF2e } from './module/actor/index.ts';
import { ResourceData } from './module/actor/creature/index.ts';
import { Rolled } from "../foundry/client/dice/_module.mjs";
import { CombatantPF2e } from './module/encounter/combatant.ts';
import { EncounterPF2e } from './module/encounter/document.ts';
import { CheckRoll } from './module/system/check/roll.ts';
import { DamageRoll } from './module/system/damage/roll.ts';
import { WorldClockSettings } from './module/system/settings/world-clock.ts';
declare global {
    namespace Hooks {
        interface SystemApplications {
            WorldClockSettings: WorldClockSettings;
        }

        interface AllHooks {
            "pf2e.startTurn": (combatant: Maybe<CombatantPF2e>, encounter: EncounterPF2e, userId: string) => Return;
            "pf2e.endTurn": (combatant: Maybe<CombatantPF2e>, encounter: EncounterPF2e, userId: string) => Return;
            "pf2e.preReroll": (
                oldRoll: Rolled<CheckRoll>,
                newRoll: CheckRoll,
                resource: Maybe<ResourceData>,
                keep?: "new" | "lower" | "higher",
            ) => Return;
            "pf2e.reroll": (
                oldRoll: Rolled<CheckRoll>,
                newRoll: Rolled<CheckRoll>,
                resource: Maybe<ResourceData>,
                keep?: "new" | "lower" | "higher",
            ) => Return;
            "pf2e.damageRoll": (roll: Rolled<DamageRoll>) => Return;
            "pf2e.systemReady": () => Return;
            "pf2e.restForTheNight": (actor: ActorPF2e) => Return;
            migrationComplete: () => Return;
            "babele.ready": () => Return;
        }
    }
}
