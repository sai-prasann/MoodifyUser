import { AuthContextProvider } from "./Features/auth/store/auth.context"
import { SongContextProvider } from "./Features/FaceTracker/store/song.context"
import AuthRouters from "./routes/AuthRouters"

function App() {

  return (
    <AuthContextProvider>
      <SongContextProvider>
        <AuthRouters />
      </SongContextProvider>
    </AuthContextProvider>
  )
}

export default App
