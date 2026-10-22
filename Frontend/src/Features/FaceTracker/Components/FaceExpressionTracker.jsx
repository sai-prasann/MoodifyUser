import { useEffect, useRef, useState } from "react";
import { initialize, detectFace } from "../Utils/expressionUtils";
import { useSong } from "../hooks/useSong";
import "../style/expressionTracker.scss";


const EMOJIS = {
    happy: "😄",
    sad: "😢",
    surprised: "😮",
    angry: "😠",
    neutral: "😐",
    "Detecting...": "🔍",
};


export default function FaceExpressionTracker() {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");
    const { setMood } = useSong();

    const handleExpression = (detectedExpression) => {
        setExpression(detectedExpression);
        setMood(detectedExpression);
    };


    useEffect(() => {

        initialize({ faceLandmarkerRef, streamRef, videoRef });
        return () => {
            streamRef.current?.getTracks().forEach(
                (track) => track.stop()
            );

            faceLandmarkerRef.current?.close();
        };
    }, []);

    return (
        <div className="tracker">
    

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="tracker__video"
            />

            <h1 className={`tracker__expression ${expression}`}>
                {EMOJIS[expression]}{" "}
                {expression.toUpperCase()}
            </h1>

            <button className="tracker__button" onClick={() => { detectFace({ faceLandmarkerRef, videoRef, setExpression: handleExpression }) }}>Detect Expression</button>
        </div>
    );
}