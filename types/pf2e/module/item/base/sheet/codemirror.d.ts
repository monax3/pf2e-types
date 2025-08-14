import { json } from "@codemirror/lang-json" with { type: "json" };
import { Extension } from '@codemirror/state';
import { DataSchema } from "../../../../../foundry/common/abstract/_types.mts";
import { EditorView } from 'codemirror';
export declare const CodeMirror: {
    EditorView: typeof EditorView;
    basicSetup: Extension;
    json: typeof json;
    jsonLinter: () => Extension;
    keybindings: Extension;
    /** All language and autocomplete extensions for rule element editing */
    ruleElementExtensions: (options: RuleElementOptions) => Extension[];
};
interface RuleElementOptions {
    schema?: DataSchema;
}
export {};
