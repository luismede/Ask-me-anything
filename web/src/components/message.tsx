import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
    id: string
    text: string
    amountOfReactions: number
    answered?: boolean
}

export function Message({ id: messageId,
    text,
    amountOfReactions,
    answered = false
    }: MessageProps) {

    const { roomId } = useParams()
    const [hasReacted, setHasReacted] = useState(false)

    if (!roomId) {
        throw new Error('Messages components must be used within room page')
    }

    async function createMessageReactionAction() {
        if (!roomId) {
            return
        }

        try {
            await createMessageReaction({ messageId, roomId })
        } catch {
            toast.error('Falha ao curtir a mensagem, Tente novamente!')
        }

        setHasReacted(true)
    }

    async function removeMessageReactionAction() {
        if (!roomId) {
            return
        }

        try {
            await removeMessageReaction({ messageId, roomId })
        } catch {
            toast.error('Falha ao remover a curtida a mensagem, Tente novamente!')
        }

        setHasReacted(false)
    }

    return (
        <li data-answared={answered} className="ml-4 mt-4 leading-relaxed text-zinc-100 data-[answared=true]:opacity-50 data-[answared=true]:pointer-events-none "> 
        {text}

        {hasReacted ? (
            <button  onClick={removeMessageReactionAction} type="button" className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500">
            Curtir pergunta ({amountOfReactions})
            <ArrowUp className="size-4" />
            </button>
        ) : (
            <button onClick={createMessageReactionAction} type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-200">
            Curtir pergunta ({amountOfReactions})
            <ArrowUp className="size-4" />
            </button>
        )}
    </li>
    )
}