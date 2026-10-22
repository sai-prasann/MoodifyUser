/* eslint react-refresh/only-export-components: "off" */
import { createContext, useCallback, useState } from "react";
import { getSong } from "../services/songs.api";

export const songContext = createContext(null);

export function SongContextProvider({ children }) {
    const [song, setSong] = useState(null);
    const [songs, setSongs] = useState([]);
    const [mood, setMood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetSong = useCallback(async (mood) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getSong({ mood });
            setSongs(response.songs);
            return response.songs;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <songContext.Provider value={{
            song,
            setSong,
            songs,
            setSongs,
            mood,
            setMood,
            loading,
            error,
            handleGetSong,
        }}>
            {children}
        </songContext.Provider>
    );
}

export const songContextProvider = SongContextProvider;