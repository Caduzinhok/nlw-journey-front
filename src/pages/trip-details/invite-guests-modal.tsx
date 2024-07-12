import { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"
import { MailPlus, X } from "lucide-react"
import { Button } from "../../components/button"

interface InviteNewGuestProps {
    closeNewGuestModal: () => void
}
export function InviteNewGuest({closeNewGuestModal} : InviteNewGuestProps){
    const {tripId } = useParams()

    async function inviteNewGuest(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const email = data.get('email')?.toString()

        await api.post(`/trips/${tripId}/invites`,{
            email,
        })
        
        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Convidar novo participante</h2>
                                <button type="button" onClick={closeNewGuestModal}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={inviteNewGuest} action="#" className="space-y-3">
                            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                                <MailPlus className="size-5 text-zinc-400" />
                                <input
                                    name="email"
                                    placeholder="Qual o email do convidado?"
                                    className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none flex-1" />
                            </div>

                            <Button variant="primary" size="full">
                                Enviar Convite
                            </Button>
                        </form>
                    </div>
                </div>
    )
}