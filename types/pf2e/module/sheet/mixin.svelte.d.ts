import * as svelte from "svelte";
interface SvelteApplicationRenderContext extends fa.ApplicationRenderContext {
    /** State data tracked by the root component: objects herein must be plain object. */
    state: object;
    /** This application instance */
    foundryApp: SvelteApplication;
}
export declare abstract class SvelteApplicationMixin_base {
    protected abstract root: svelte.Component<any>;
    /** State data tracked by the root component */
    protected $state: object;
    protected _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    protected _replaceHTML(result: SvelteApplicationRenderContext, content: HTMLElement, options: fa.ApplicationRenderOptions): void;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
}
export declare function SvelteApplicationMixin<T extends AbstractConstructorOf<fa.api.ApplicationV2>>(Base: T): AbstractMixin<T, SvelteApplicationMixin_base, typeof SvelteApplicationMixin_base & typeof fa.api.ApplicationV2>;
type SvelteApplication = InstanceType<ReturnType<typeof SvelteApplicationMixin>>;
export type { SvelteApplicationRenderContext };
