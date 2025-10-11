import { SettingRegistration } from "../../../../foundry/client/helpers/client-settings.mts";
import fields = foundry.data.fields;
declare const VariantRulesSettings_base: AbstractMixin<typeof fa.api.ApplicationV2, fa.api.HandlebarsApplication, typeof fa.api.HandlebarsApplication & typeof fa.api.ApplicationV2>;
export declare class VariantRulesSettings extends VariantRulesSettings_base {
    #private;
    static DEFAULT_OPTIONS: {
        id: string;
        window: {
            icon: string;
            title: string;
            contentTag: string;
            contentClasses: string[];
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
    };
    static PARTS: {
        settings: {
            template: string;
        };
        footer: {
            template: string;
        };
    };
    static register(): void;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<VariantRulesSettingsContext>;
    protected _onChangeForm(_formConfig: fa.ApplicationFormConfiguration, event: Event): void;
}
interface VariantRulesSettingsContext extends fa.ApplicationRenderContext {
    settings: Record<string, SettingRenderData>;
    buttons: fa.FormFooterButton[];
    rootId: string;
}
interface SettingRenderData extends Omit<SettingRegistration, "name" | "type"> {
    type: fields.DataField;
    value: unknown;
    pwolModifier: boolean;
}
export {};
