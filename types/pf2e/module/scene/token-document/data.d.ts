import { DocumentFlags } from "../../../../foundry/common/data/_module.mts";
import { ModelPropsFromSchema } from "../../../../foundry/common/data/fields.mts";
import { TokenSchema } from "../../../../foundry/common/documents/token.mts";
type TokenFlagsPF2e = DocumentFlags & {
    pf2e: {
        [key: string]: unknown;
        linkToActorSize: boolean;
        autoscale: boolean;
    };
};
type DetectionModeEntry = ModelPropsFromSchema<TokenSchema>["detectionModes"][number];
export type { DetectionModeEntry, TokenFlagsPF2e };
