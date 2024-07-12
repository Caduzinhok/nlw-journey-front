import {  BookmarkCheck, Calendar, MapPin, X } from "lucide-react"
import { Button } from "../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"

export function DestinationAndDateHeaderEnable() {
    const {tripId } = useParams()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [destination, setDestination] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    function openDatePicker() {
        return (
            setIsDatePickerOpen(true)
        )
    }
    function closeDatePicker() {
        return (
            setIsDatePickerOpen(false)
        )
    }
    async function updateLocalAndDate(){
        if(!destination){
            return
        }

        if(!eventStartAndEndDates?.to || !eventStartAndEndDates?.from){
            return
        }

        await api.put(`/trips/${tripId}`,{
            destination: destination,
            starts_at: eventStartAndEndDates?.from,
            ends_at: eventStartAndEndDates.to
        })

        window.document.location.reload()
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
        : null

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="h-16 bg-zinc-900 px-2 rounded-xl flex items-center shadow-shape gap-3 w-full">

                <div className="flex items-center gap-2 flex-1">
                    <MapPin className="size-5 text-zinc-400" />
                    <input
                        onChange={(event) => setDestination(event.target.value)}
                        type="text"
                        placeholder="Para onde você vai?"
                        className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1" />
                </div>

                <button onClick={openDatePicker} className="flex items-center gap-2 outline-none text-left w-[220px]">
                    <Calendar className="size-5 text-zinc-400" />
                    <span
                        className="bg-transparent text-lg w-40 flex-1" >{displayedDate ? displayedDate : 'Quando?'}</span>
                </button>

                {isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Selecione a data</h2>
                                    <button type="button" onClick={closeDatePicker}>
                                        <X className="size-5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>
                            <DayPicker modifiersStyles={{
                                selected: {
                                    backgroundColor: '#BEF264',
                                    color: '#FFFFFF',
                                }
                            }} mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                        </div>
                    </div>
                )}

                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="primary" onClick={updateLocalAndDate}>
                    Confirmar Alterações
                    <BookmarkCheck className="size-5" />
                </Button>
            </div>

        </div>
    )
}