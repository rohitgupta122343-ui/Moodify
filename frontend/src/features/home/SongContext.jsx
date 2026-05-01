import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{

    const [song, setsong] = useState({
  "url": "https://ik.imagekit.io/0wmauyftj/moodify/songs/Rona_Taqdeer_S0dP8yx_P.mp3",
  "posterUrl": "https://ik.imagekit.io/0wmauyftj/moodify/posters/undefined_4RtJGT8jFz.jpeg",
  "title": "Rona Taqdeer",
  "mood": "sad",

    })

    const [loading, setloading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setsong, loading, setloading }}>
            {children}
        </SongContext.Provider>
    )

}