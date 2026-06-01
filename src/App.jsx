import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

import useAuthStore from "./store/authStore";

function App() {

  const login = useAuthStore((state) => state.login);

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {
      login(JSON.parse(user));
    }

  }, []);

  return <AppRoutes />;
}

export default App;