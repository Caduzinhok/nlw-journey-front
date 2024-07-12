import { Link, User2, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
}

export function CreateLinksModal({closeCreateLinkModal}: CreateLinkModalProps){
    const {tripId } = useParams()

    async function createNewLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()
        await api.post(`/trips/${tripId}/links`,{
            title,
            url
        })
        
        window.document.location.reload()
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Cadastrar novo Link</h2>
                                <button type="button" onClick={closeCreateLinkModal}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={createNewLink} action="#" className="space-y-3">
                            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                                <User2 className="size-5 text-zinc-400" />
                                <input
                                    name="title"
                                    placeholder="Qual o título do link"
                                    className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none flex-1" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-14 flex-1 w-36 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                                    <Link className="size-5 text-zinc-400" />
                                    <input
                                        name="url"
                                        placeholder="Qual o URL do link?"
                                        className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none flex-1" />
                                </div>
                            </div>

                            <Button variant="primary" size="full">
                                Salvar Link
                            </Button>
                        </form>
                    </div>
                </div>
    )
}