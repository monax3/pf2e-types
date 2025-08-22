import { DocumentFlags } from "../../../../foundry/common/data/_module.mts";
import { ModelPropsFromSchema } from "../../../../foundry/common/data/fields.mts";
import { TokenSchema } from "../../../../foundry/common/documents/token.mts";
interface TokenFlagDataPF2e {
    pf2e: {
        [key: string]: unknown;
        linkToActorSize: boolean;
        autoscale: boolean;
    };
}
type TokenFlagsPF2e = TokenFlagDataPF2e & DocumentFlags;
type DetectionModeEntry = ModelPropsFromSchema<TokenSchema>["detectionModes"][number];
export type { DetectionModeEntry, TokenFlagDataPF2e, TokenFlagsPF2e };
