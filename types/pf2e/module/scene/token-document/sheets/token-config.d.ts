import { default as FormDataExtended } from "../../../../../foundry/client/applications/ux/form-data-extended.mts";
import { DatabaseCreateOperation, DatabaseUpdateOperation } from "../../../../../foundry/common/abstract/_types.mts";
declare const TokenConfigPF2e_base: AbstractMixin<typeof fa.sheets.TokenConfig, import('./mixin.ts').TokenConfigMixin_base & fa.api.HandlebarsApplication, typeof import('./mixin.ts').TokenConfigMixin_base & fa.api.HandlebarsApplication & fa.api.ApplicationV2<fa.ApplicationConfiguration, fa.ApplicationRenderOptions, fa.ApplicationRenderContext>>;
declare class TokenConfigPF2e extends TokenConfigPF2e_base {
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): Record<string, unknown>;
    protected _processSubmitData(event: SubmitEvent, form: HTMLFormElement, submitData: Record<string, unknown>, options?: Partial<DatabaseCreateOperation<Scene | null>> | Partial<DatabaseUpdateOperation<Scene | null>>): Promise<void>;
}
export { TokenConfigPF2e };
