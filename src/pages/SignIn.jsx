import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAccount, saveUser } from "../utils/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    const account = getAccount();

    if (!account) {
      toast.error("আগে একটি অ্যাকাউন্ট তৈরি করুন");
      return;
    }

    if (email.trim().toLowerCase() !== account.email.trim().toLowerCase() || password !== account.password) {
      toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল");
      return;
    }

    saveUser({ name: account.name, email: account.email });
    toast.success("সফলভাবে লগইন হয়েছে");
    navigate(location.state?.from || "/");
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[28px] border p-7 md:p-9">
        <div className="text-center mb-7">
          <div className="text-5xl">🛒</div>
          <h1 className="text-3xl font-black mt-4">সাইন ইন</h1>
          <p className="text-gray-500 mt-2">আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন।</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border rounded-xl px-4 py-3" type="email" placeholder="ইমেইল"
            value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full border rounded-xl px-4 py-3" type="password" placeholder="পাসওয়ার্ড"
            value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-[#087f3e] text-white py-3 rounded-xl font-black">
            সাইন ইন
          </button>
        </form>

        <div className="mt-5">
          <div className="text-center text-gray-400 text-sm mb-3">অথবা</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={()=>toast("Demo Google login button. Connect OAuth credentials for production.")} className="border rounded-xl py-3 font-semibold">Google</button>
            <button onClick={()=>toast("Demo GitHub login button. Connect OAuth credentials for production.")} className="border rounded-xl py-3 font-semibold">GitHub</button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link to="/signup" className="text-[#087f3e] font-black">রেজিস্টার করুন</Link>
        </p>
      </div>
    </div>
  );
}
