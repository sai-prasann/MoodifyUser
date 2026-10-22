import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

const getScore = (shapes, name) =>
    shapes.find(
        (shape) => shape.categoryName === name
    )?.score ?? 0;

const detectExpression = (shapes, setExpression) => {
    const avg = (left, right) =>
        (getScore(shapes, left) +
            getScore(shapes, right)) / 2;

    const smile = avg(
        "mouthSmileLeft",
        "mouthSmileRight"
    );

    const frown = avg(
        "mouthFrownLeft",
        "mouthFrownRight"
    );

    const browUp = getScore(
        shapes,
        "browInnerUp"
    );

    const jawOpen = getScore(
        shapes,
        "jawOpen"
    );

    const eyeWide = avg(
        "eyeWideLeft",
        "eyeWideRight"
    );

    const browDown = avg(
        "browDownLeft",
        "browDownRight"
    );

    const eyeSquint = avg(
        "eyeSquintLeft",
        "eyeSquintRight"
    );

    const mouthPress = avg(
        "mouthPressLeft",
        "mouthPressRight"
    );

    if (
        jawOpen > 0.20 &&
        (eyeWide > 0.04 || browUp > 0.10)
    ) {
        setExpression("surprised");
        return;
    }

    if (smile > 0.25) {
        setExpression("happy");
        return;
    }

    if (
        browDown > 0.30 &&
        (eyeSquint > 0.10 || mouthPress > 0.08)
    ) {
        setExpression("angry");
        return;
    }

    if (
        frown > 0.12 &&
        browUp > 0.06 &&
        smile < 0.20
    ) {
        setExpression("sad");
        return;
    }

    setExpression("neutral");
};


export const initialize = async ({ faceLandmarkerRef, streamRef, videoRef }) => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        faceLandmarkerRef.current =
            await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                },
                runningMode: "VIDEO",
                numFaces: 1,
                outputFaceBlendshapes: true,
            });

        streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 640,
                height: 480,
                facingMode: "user",
            },
            audio: false,
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
    } catch (error) {
        console.error(error);
    }
};

export const detectFace = ({ faceLandmarkerRef, videoRef, setExpression }) => {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    if (!video || !faceLandmarker) return;

    if (video.readyState >= 2) {
        const results = faceLandmarker.detectForVideo(
            video,
            performance.now()
        );

        if (results.faceBlendshapes?.length > 0) {
            detectExpression(
                results.faceBlendshapes[0].categories,
                setExpression
            );
        } else {
            setExpression("Detecting...");
        }
    }
};