import { useContext } from "react";
import Navbar from "./components/Navbar";

import MainRoute from "./Routes/MainRoute";
import { AuthContext } from "./store/AuthStore";

function App() {
  const { isauthenticated } = useContext(AuthContext);

  return (
    <div>
      {isauthenticated && <Navbar />}
      <MainRoute />
    </div>
  );
}

export default App;
