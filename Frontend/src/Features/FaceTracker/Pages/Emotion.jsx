import FaceExpressionTracker from "../Components/FaceExpressionTracker";
import Songs from "../Components/Songs";

const Emotion = () => {
  return (
    <main className="emotion-page">
      <FaceExpressionTracker />
      <Songs />
    </main>
  );
};

export default Emotion;
