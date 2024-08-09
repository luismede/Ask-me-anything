import { ArrowRight, Share2 } from "lucide-react"
import { useParams } from "react-router-dom"
import AmaLogo from '../assets/ama-logo.svg'
import { toast } from "sonner"
import { Message } from "../components/message"




export function Room() {
    const { roomId } = useParams()

    function handleShareRoom() {
        const url = window.location.href.toString()

        if (navigator.share != undefined && navigator.canShare()) {
            navigator.share({ url })
        } else {
            navigator.clipboard.writeText(url)

            toast.success('URL copiada para sua área de transferência!')
        }
    }

    return (
        <div className="mx-auto max-w-[648px] flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3 ">
                <img src={AmaLogo} alt="AMA LOGO" className="h-5" />

                <span className="text-sm text-zinc-500 truncate">
                    Código da sala: <span className="text-orange-300">{roomId}</span>
                </span>

                <button                         
                    type='submit'
                    onClick={handleShareRoom}
                    className='bg-zinc-900
                    text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center 
                    rounded-lg font-medium tex-sm transition-colors 
                    hover:bg-zinc-800 ml-auto'>
                        Compartilhar
                    <Share2 className='size-4' />
                    
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900"></div>

            <form 
                    className='flex items-center gap-2 bg-zinc-900 p-2 
                        rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-2'>
                    
                    <input 
                        type='text'
                        name='theme'
                        placeholder='Qual a sua pergunta?'
                        autoComplete='off'
                        className='flex-1 tex-sm bg-transparent mx-3 outline-none 
                        placeholder-zinc-500 text-zinc-100'
                    />

                    <button 
                        type='submit'
                        className='bg-orange-400
                        text-orange-950 px-3 py-1.5 gap-1.5 flex items-center 
                        rounded-lg font-medium tex-sm transition-colors hover:bg-orange-500'>
                        Criar pergunta
                        <ArrowRight className='size-4' />
                    </button>
                </form>

                <ol className="list-decimal list-outside px-3 space-y-8">
                    <Message text="Hello World with Go and React" amountOfReactions={10} answared/>
                    <Message text="Hello World with Go and React 2" amountOfReactions={3}/>
                </ol>
        </div>
    )
}