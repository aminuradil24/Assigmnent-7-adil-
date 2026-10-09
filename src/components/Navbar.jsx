import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, UserRound, LogOut } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUser, logoutUser } from "../utils/auth";
import PriceTicker from "./PriceTicker";

const links = [
  ["চাল", "/category/chal"],
  ["ডাল", "/category/dal"],
  ["সবজি", "/category/shobji"],
  ["মাছ", "/category/mach"],
  ["মাংস", "/category/mangsho"],
  ["ডিম", "/category/dim"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  function logout() {
    logoutUser();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    setOpen(false);
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container-main">
        <div className="min-h-[78px] flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl green-gradient flex items-center justify-center text-2xl">
              🛒
            </div>
            <div>
              <div className="font-black text-xl text-[#087f3e]">বাজার দর</div>
              
<div className="text-xs text-gray-500">
  {new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date())}
</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {links.map(([label, url]) => (
              <NavLink
                key={url}
                to={url}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#087f3e] text-white"
                      : "text-gray-700 hover:bg-green-50"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/profile" className="px-4 py-2 rounded-full border flex items-center gap-2">
                  <UserRound size={16} /> প্রোফাইল
                </Link>
                <button onClick={logout} className="px-4 py-2 rounded-full bg-red-50 text-red-600 flex items-center gap-2">
                  <LogOut size={16} /> সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="px-4 py-2 font-semibold">সাইন ইন</Link>
                <Link to="/signup" className="px-5 py-2 rounded-full bg-[#087f3e] text-white font-bold">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

          <button
            aria-label="menu"
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="hidden lg:flex xl:hidden items-center justify-center gap-1 pb-3">
          {links.map(([label, url]) => (
            <NavLink
              key={url}
              to={url}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm font-semibold ${
                  isActive ? "bg-[#087f3e] text-white" : "hover:bg-green-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map(([label, url]) => (
              <Link
                key={url}
                to={url}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl bg-gray-50 font-semibold"
              >
                {label}
              </Link>
            ))}
            {user ? (
              <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl bg-red-50 text-red-600">
                সাইন আউট
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/signin" onClick={() => setOpen(false)} className="text-center border rounded-xl py-3">সাইন ইন</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="text-center bg-[#087f3e] text-white rounded-xl py-3">সাইন আপ</Link>
              </div>
            )}
          </div>
        )}
      </div>
      <PriceTicker />
    </header>
  );
}
