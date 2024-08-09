import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
    text: string
    amountOfReactions: number
    answared?: boolean
}

export function Message({ text, amountOfReactions, answared = false }: MessageProps) {

    const [hasReacted, setHasReacted] = useState(false)

    function handleReactToMessage() {
        setHasReacted(true)
    }

    return (
        <li data-answared={answared} className="ml-4 mt-4 leading-relaxed text-zinc-100 data-[answared=true]:opacity-50 data-[answared=true]:pointer-events-none "> 
        {text}

        {hasReacted ? (
            <button  type="button" className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500">
            Curtir pergunta ({amountOfReactions})
            <ArrowUp className="size-4" />
            </button>
        ) : (
            <button onClick={handleReactToMessage} type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-200">
            Curtir pergunta ({amountOfReactions})
            <ArrowUp className="size-4" />
            </button>
        )}
    </li>
    )
}