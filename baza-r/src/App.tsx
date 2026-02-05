import { Layout } from "./shared/components/ui/layout/Layout";
import DrawerModalHost from "./widgets/drawer/ui/DrawerModalHost";
import AuthModalHost from "./widgets/login-dialog/ui/AuthModalHost";

function App() {
  return (
    <>
      <Layout></Layout>
      <AuthModalHost />
      <DrawerModalHost />
    </>
  );
}

export default App;
