import { Outlet } from "react-router";
import { SuspenseBoundary } from "@/components/suspense-boundary";

const AuthLayoutPage = () => {
  return (
    <main>
      <SuspenseBoundary>
        <Outlet />
      </SuspenseBoundary>
    </main>
  );
};

export default AuthLayoutPage;
