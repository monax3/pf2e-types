import { DocumentSheetConfiguration, DocumentSheetRenderContext } from "../../../../../foundry/client/applications/api/_module.mts";
import { HandlebarsApplication } from "../../../../../foundry/client/applications/api/handlebars-application.mts";
export declare abstract class TokenConfigMixin_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration>;
    get linkToActorSize(): boolean;
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    get rulesBasedVision(): boolean;
    protected processFormData(data: Record<string, unknown>, form: HTMLFormElement): Record<string, unknown>;
    protected processSubmitData(submitData: Record<string, unknown>): Promise<void>;
}
export declare function TokenConfigMixinPF2e<TMixin extends AbstractConstructorOf<fa.api.ApplicationV2 & HandlebarsApplication> & Omit<typeof fa.api.ApplicationV2 & typeof HandlebarsApplication, "prototype">>(Base: TMixin): AbstractMixin<TMixin, TokenConfigMixin_base & HandlebarsApplication, typeof TokenConfigMixin_base & HandlebarsApplication & fa.api.ApplicationV2>;
interface TokenConfigContext extends DocumentSheetRenderContext {
    /** Whether the token can be linked to its actor's size */
    sizeLinkable: boolean;
    linkToSizeTitle: string;
    autoscaleTitle: string;
}
export type { TokenConfigContext };
