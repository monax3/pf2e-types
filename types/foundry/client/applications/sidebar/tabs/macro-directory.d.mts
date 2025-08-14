import { ApplicationConfiguration } from "../../_types.mjs";
import Macro from "../../../documents/macro.mjs";
import DocumentDirectory from "../document-directory.mjs";

/**
 * The World Macro directory listing.
 */
export default class MacroDirectory extends DocumentDirectory<Macro> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "macros";
}
