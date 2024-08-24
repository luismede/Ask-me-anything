import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm() {
    const { roomId } = useParams()


    if (!roomId) {
        throw new Error('Messages components must be used within room page')
    }

    async function createMessageAction(data: FormData) {
        const message = data.get('message')?.toString()

        if (!message || !roomId) {
            return
        }
        try {
            await createMessage({ message, roomId })
        } catch {
            toast.error('Falha ao enviar pergunta. Tente novamente!')
        }
    }



    return (
        <form
        action={createMessageAction}
        className='flex items-center gap-2 bg-zinc-900 p-2 
        rounded-xl border border-zinc-800 ring-cyan-700 ring-offset-2 ring-offset-zinc-950 focus-within:ring-2'>

        <input 
            type='text'
            name='message'
            placeholder='Qual a sua pergunta?'
            autoComplete='off'
            className='flex-1 tex-sm bg-transparent mx-3 outline-none 
            placeholder-zinc-500 text-zinc-100'
            />

        <button 
            type='submit'
            className='bg-cyan-700
            text-zinc-100 px-3 py-1.5 gap-1.5 flex items-center 
            rounded-lg font-normal tex-sm transition-colors hover:bg-cyan-600'>
            Criar pergunta
            <ArrowRight className='size-4' />
        </button>
    </form>
    )
}   