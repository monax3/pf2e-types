import { CompendiumIndexData } from "../../../foundry/client/documents/collections/compendium-collection.mts";
import { DocumentConstructionContext } from "../../../foundry/common/_types.mts";
import { DatabaseGetOperation, Document } from "../../../foundry/common/abstract/_module.mts";
declare class ClientDatabaseBackendPF2e extends foundry.data.ClientDatabaseBackend {
    protected _getDocuments<TDocument extends Document>(documentClass: AbstractConstructorOf<TDocument> & {
        documentName: string;
        fromSource(data: object, options: DocumentConstructionContext<Document | null>): Document;
    }, operation: DatabaseGetOperation<TDocument["parent"]>, user?: User): Promise<(DeepPartial<Document["_source"]> & CompendiumIndexData)[] | Document[]>;
}
export { ClientDatabaseBackendPF2e };
