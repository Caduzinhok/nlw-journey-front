import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { InviteNewGuest } from "./invite-guests-modal";
interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}
export function Guests() {
    const [isNewGuestModalOpen, setIsNewGuestModalOpen] = useState(false)
    const {tripId} = useParams()
    const [participants, setParticipants] = useState<Participant[]>([])
    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])
    

    function openNewGuestModal(){
        setIsNewGuestModalOpen(true)
    }

    function closeNewGuestModal(){
        setIsNewGuestModalOpen(false)
    }
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
            {
                participants.map(((participant, index)=> {
                    return (
                        <div key={participant.id}
                        className="flex items-center justify-between gap-4">
                        <div className=" space-y-1.5 flex-1">
                            <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                            <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
                        </div>
                        {participant.is_confirmed ? <CheckCircle2 className="size-5 text-green-400" /> : <CircleDashed className="size-5 text-zinc-400" />}
                    </div>
                    )
                }))
            }
                
            </div>

            <Button variant="secondary" size="full" onClick={openNewGuestModal}>
                <UserCog className="size-5" />
                Gerenciar Convidados
            </Button>

            {isNewGuestModalOpen && 
            <InviteNewGuest
                closeNewGuestModal={closeNewGuestModal}
            />}
        </div>
    )
}