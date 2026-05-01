import { useEffect } from "react";
import { RoutesProvider } from "./_providers/RoutesProvider";
import { useAuthStore } from "@/shared/model/auth.store";

export function App() {
  const initialize = useAuthStore((s) => s.initialize);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  useEffect(() => {
    initialize();
  }, []);

  if (isInitializing) return null;

  return <RoutesProvider />;
}

export default App;
