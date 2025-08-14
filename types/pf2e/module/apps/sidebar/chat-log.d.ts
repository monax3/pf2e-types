import { ApplicationRenderContext } from "../../../../foundry/client/applications/_types.mts";
import { ContextMenuEntry } from "../../../../foundry/client/applications/ux/context-menu.mts";
import { ChatSpeakerData } from "../../../../foundry/common/documents/chat-message.mts";
import { ChatMessagePF2e } from '../../chat-message/index.ts';
declare class ChatLogPF2e extends fa.sidebar.tabs.ChatLog {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    _onRender(context: ApplicationRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** Replace parent method in order to use DamageRoll class as needed */
    processMessage(message: string, options?: {
        speaker?: ChatSpeakerData;
    }): Promise<ChatMessagePF2e | undefined>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
export { ChatLogPF2e };
