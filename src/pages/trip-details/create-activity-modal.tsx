import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void
}

export function CreateActivityModal({closeCreateActivityModal}: CreateActivityModalProps ){
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Cadastrar Atividade</h2>
                                <button type="button" onClick={closeCreateActivityModal}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                            <p className="text-sm text-zinc-400">
                                Todos convidados podem visualizar as atividades.
                            </p>
                        </div>

                        <form action="#" className="space-y-3">
                            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                                <Tag className="size-5 text-zinc-400" />
                                <input
                                    name="title"
                                    placeholder="Qual a atividae?"
                                    className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none flex-1" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-14 flex-1 w-36 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                                    <Calendar className="size-5 text-zinc-400" />
                                    <input
                                        type="datetime-local"
                                        name="occurs-at"
                                        placeholder="Data e Horário da Atividade"
                                        className="bg-transparent text-lg placeholder:text-zinc-400 w-40 outline-none flex-1" />
                                </div>
                            </div>

                            <Button variant="primary" size="full">
                                Salvar Atividade
                            </Button>
                        </form>
                    </div>
                </div>
    )
}