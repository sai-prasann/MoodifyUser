import { useContext } from "react";
import { songContext } from "../store/song.context";

export const useSong = () => {
    return useContext(songContext);
};
