import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="w-full flex flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
