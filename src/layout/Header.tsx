import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function Header() {
  return (
    <header className="w-full flex items-center bg-sky-900 px-6 py-4 text-sky-50 shadow">
      <div className="flex w-44 items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500 font-semibold">
          RFX
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide">RFX JSC</p>
          <p className="text-xs text-sky-100/80">COMPANY</p>
        </div>
      </div>

      <NavLink
        to="/"
        aria-label="Home"
        title="Home"
        className="ml-3 inline-flex h-8 w-8 items-center justify-center"
      >
        <AiOutlineHome className="h-5 w-5" />
      </NavLink>

      <nav className="flex items-center gap-4 border-l-2 border-white pl-4 text-white ml-3">
        <NavLink to="/" className="text-sm hover:underline">
          Messages
        </NavLink>
        <NavLink to="/discussion" className="text-sm hover:underline">
          Discussion
        </NavLink>
        <NavLink to="/attachments" className="text-sm hover:underline">
          Attachments
        </NavLink>
      </nav>

      <div className="ml-auto hidden items-center gap-4 text-xs md:flex">
        <div className="text-right">
          <p className="font-semibold">ABC Agent</p>
          <p className="text-sky-100/80">Agent Administration</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-sky-700" />
      </div>
    </header>
  );
}
