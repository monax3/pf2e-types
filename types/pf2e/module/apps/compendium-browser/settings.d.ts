declare const CompendiumBrowserSettingsApp_base: AbstractMixin<typeof fa.api.ApplicationV2, fa.api.HandlebarsApplicationMixin_base, typeof fa.api.HandlebarsApplicationMixin_base & typeof fa.api.ApplicationV2>;
declare class CompendiumBrowserSettingsApp extends CompendiumBrowserSettingsApp_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    tabGroups: Record<string, string>;
    protected _preFirstRender(context: Record<string, unknown>, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _attachPartListeners(partId: string, html: HTMLElement, options: fa.api.HandlebarsRenderOptions): void;
    protected _prepareContext(_options: fa.api.HandlebarsRenderOptions): Promise<object>;
}
export { CompendiumBrowserSettingsApp };
