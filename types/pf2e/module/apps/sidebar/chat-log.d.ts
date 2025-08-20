import { ApplicationRenderContext, ApplicationRenderOptions } from "../../../../foundry/client/applications/_types.mts";
import { default as ChatPopout } from "../../../../foundry/client/applications/sidebar/apps/chat-popout.mts";
import { ContextMenuEntry } from "../../../../foundry/client/applications/ux/context-menu.mts";
import { ChatSpeakerData } from "../../../../foundry/common/documents/chat-message.mts";
import { ChatMessagePF2e } from '../../chat-message/index.ts';
declare class ChatLogPF2e extends fa.sidebar.tabs.ChatLog {
    #private;
    static DEFAULT_OPTIONS: {
        actions: Record<string, fa.ApplicationClickAction>;
    };
    _onRender(context: ApplicationRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** Replace parent method in order to use DamageRoll class as needed */
    processMessage(message: string, options?: {
        speaker?: ChatSpeakerData;
    }): Promise<ChatMessagePF2e | undefined>;
    static onRenderChatPopout(popout: ChatPopout, options: ApplicationRenderOptions): Promise<void>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
export { ChatLogPF2e };
