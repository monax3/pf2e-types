import { FormDataExtended } from "../../../../../foundry/client/applications/ux/_module.mts";
declare const PrototypeTokenConfigPF2e_base: AbstractMixin<typeof fa.sheets.PrototypeTokenConfig, import('./mixin.ts').TokenConfigMixin_base & fa.api.HandlebarsApplication, typeof import('./mixin.ts').TokenConfigMixin_base & fa.api.HandlebarsApplication & fa.api.ApplicationV2<fa.ApplicationConfiguration, fa.ApplicationRenderOptions, object>>;
declare class PrototypeTokenConfigPF2e extends PrototypeTokenConfigPF2e_base {
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): Record<string, unknown>;
    _processChanges(submitData: Record<string, unknown>): Promise<void>;
}
export { PrototypeTokenConfigPF2e };
