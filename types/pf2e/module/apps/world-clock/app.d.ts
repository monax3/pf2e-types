import { HandlebarsRenderOptions, HandlebarsTemplatePart } from "../../../../foundry/client/applications/api/handlebars-application.mts";
import { DateTime } from 'luxon';
import { animateDarkness } from './animate-darkness.ts';
interface WorldClockData {
    date: string;
    time: string;
    options?: object;
    user: User;
    sign: "+" | "-";
}
declare const WorldClock_base: AbstractMixin<typeof fa.api.ApplicationV2, fa.api.HandlebarsApplication, typeof fa.api.HandlebarsApplication & typeof fa.api.ApplicationV2>;
export declare class WorldClock extends WorldClock_base {
    #private;
    constructor();
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, HandlebarsTemplatePart>;
    readonly animateDarkness: typeof animateDarkness;
    /** Setting: the date theme (Imperial Calendar not yet supported) */
    get dateTheme(): "AR" | "IC" | "AD" | "CE";
    /** Setting: display either a 24-hour or 12-hour clock */
    get timeConvention(): 24 | 12;
    /** Setting: whether to keep the scene's darkness level synchronized with the world time */
    get syncDarkness(): boolean;
    /** Setting: Date and time of the Foundry world's creation date */
    get worldCreatedOn(): DateTime;
    /** The current date and time of the game world */
    get worldTime(): DateTime;
    /** The era in the game */
    get era(): string;
    /** The year in the game */
    get year(): number;
    /** The month in the game */
    get month(): string;
    /** The day of the week in the game */
    get weekday(): string;
    protected _prepareContext(options: HandlebarsRenderOptions): Promise<WorldClockData>;
    protected _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    /** Advance the world time by a static or input value */
    protected _onRender(context: WorldClockData, options: HandlebarsRenderOptions): Promise<void>;
    protected _onClose(options: fa.ApplicationClosingOptions): Promise<void>;
    /** Create a message informing the user that scene darkness is synced to world time */
    static createSyncedMessage(): HTMLSpanElement;
}
export {};
