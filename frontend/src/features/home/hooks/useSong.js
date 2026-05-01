import { useContext } from "react";
import { SongContext } from "../songContext";
import { getSong } from "../services/songApi";

export function useSong(){

    const { song, setsong, loading, setloading } = useContext(SongContext)

    async function handleGetSong({ mood }){
        setloading(true)
        try {
            const data = await getSong({mood})
            setsong(data.song)
        } catch (error) {
            console.error("Error fetching song:", error)
        } finally {
            setloading(false)
        }
    }

    return { loading, song, handleGetSong, setsong }

}