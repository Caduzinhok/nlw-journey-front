import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { CreateLinksModal } from "./create-links-modal";

interface Link {
    id: string
    title: string | undefined
    url: string
}

export function ImportantLinks() {
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const { tripId } = useParams()
    const [links, setLinks] = useState<Link[]>([])

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
    }, [tripId])

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true)
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false)
    }
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>
            <div className="space-y-5">
                {links && links.length > 0 ?
                    links.map(link => {
                        return (
                            <div key={link.id} className="flex items-center justify-between gap-4">
                                <div className=" space-y-1.5 flex-1">
                                    <span className="block font-medium text-zinc-100">{link.title}</span>
                                    <a href={link.url} className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">{link.url}</a>
                                </div>
                                <a href={link.url}>
                                    <Link2 className="size-5 text-zinc-400" />
                                </a>
                            </div>
                        )
                    })
                    :
                    <p className="text-center">Nenhum link encontrado</p>
                }
            </div>
            <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>

            {isCreateLinkModalOpen &&
                <CreateLinksModal
                    closeCreateLinkModal={closeCreateLinkModal}
                />}
        </div>
    )
}