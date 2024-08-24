import { ArrowRight } from 'lucide-react'

import amaLogo from '../assets/ama-logo.svg'

import { useNavigate } from 'react-router-dom'
import { createRoom } from '../http/create_room'
import { toast } from 'sonner'

export function CreateRoom() {
    const navigate = useNavigate()

    async function handleCreateRoom(data: FormData) {
        const theme = data.get('theme')?.toString()
        
        if (!theme) {
            return
        }

        try {
            const { roomId } = await createRoom({ theme })

        navigate(`/room/${roomId}`)
        } catch {
            toast.error('Falha ao criar a sala!')
        }
    }

    return (
        <main className='h-screen flex items-center justify-center px-4'>
            <div className='max-w-[450px] flex flex-col gap-6'>
                <img src={amaLogo} alt="AMA LOGO" className='h-10' />

                <p className='leading-relaxed text-zinc-300 text-center'>
                Crie uma sala pública de AMA (Ask me anything) 
                e priorize as perguntas mais importantes para a comunidade.
                </p>

                <form 
                    // onSubmit={handleCreateRoom} REACT 18
                    action={handleCreateRoom} // REACT 19
                    className='flex items-center gap-2 bg-zinc-900 p-2 
                        rounded-xl border border-zinc-800 ring-cyan-700 ring-offset-2 ring-offset-zinc-950 focus-within:ring-2'>
                    
                    <input 
                        type='text'
                        name='theme'
                        placeholder='Nome da sala'
                        autoComplete='off'
                        className='flex-1 tex-sm bg-transparent mx-3 outline-none 
                        placeholder-zinc-500 text-zinc-100'
                        required
                    />

                    <button 
                        type='submit'
                        className='bg-cyan-700
                        text-zinc-100 px-3 py-1.5 gap-1.5 flex items-center 
                        rounded-lg font-medium text-sm transition-colors hover:bg-cyan-600'>
                        Criar Sala
                        <ArrowRight className='size-4' />
                    </button>

                </form>
            </div>
        </main>
    )
}