import { default as enJSON } from "../../../en.json" with { type: "json" };
type Sanctification = "holy" | "unholy";
type DeityDomain = Lowercase<keyof (typeof enJSON)["PF2E"]["Item"]["Deity"]["Domain"]>;
export type { Sanctification, DeityDomain };
