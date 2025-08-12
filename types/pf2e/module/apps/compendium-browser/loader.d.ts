import { CompendiumDocument } from "../../../../foundry/client/documents/_module.mts";
import { default as CompendiumCollection, CompendiumIndex } from "../../../../foundry/client/documents/collections/compendium-collection.mts";
import { CompendiumBrowserSources } from './browser.ts';
declare class PackLoader {
    #private;
    loadedSources: string[];
    sourcesSettings: CompendiumBrowserSources;
    constructor();
    loadPacks(documentType: "Actor" | "Item", packs: string[], indexFields: string[]): AsyncGenerator<{
        pack: CompendiumCollection<CompendiumDocument>;
        index: CompendiumIndex;
    }, void, unknown>;
    updateSources(packs: string[]): Promise<void>;
    reset(): void;
    hardReset(packs: string[]): Promise<void>;
}
export { PackLoader };
