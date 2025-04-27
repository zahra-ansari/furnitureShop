import { Outlet } from "react-router-dom";
import WelcomeHeader from "./WelcomeHeader";

function AppLayout() {
  return (
    <>
      <WelcomeHeader />
      <Outlet />
    </>
  );
}

export default AppLayout;
