import { ApplicationConfiguration } from "../../_types.mjs";
import { ContextMenuEntry } from "../../ux/context-menu.mjs";
import RollTable from "../../../documents/roll-table.mjs";
import DocumentDirectory from "../document-directory.mjs";

/**
 * The World RollTable directory listing.
 */
export default class RollTableDirectory extends DocumentDirectory<RollTable> {
    static override DEFAULT_OPTIONS: Partial<ApplicationConfiguration>;

    static override tabName: "tables";

    /* -------------------------------------------- */
    /*  Rendering                                   */
    /* -------------------------------------------- */

    protected override _getEntryContextOptions(): ContextMenuEntry[];
}
