import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveAccount } from "../utils/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }
    if (form.password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    saveAccount(form);
    toast.success("রেজিস্ট্রেশন সফল হয়েছে");
    navigate("/signin");
  }

  return (
    <AuthShell title="নতুন অ্যাকাউন্ট তৈরি করুন" subtitle="বাজার দর ব্যবহার করতে একটি অ্যাকাউন্ট তৈরি করুন।">
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border rounded-xl px-4 py-3" placeholder="আপনার নাম" value={form.name}
          onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3" type="email" placeholder="ইমেইল" value={form.email}
          onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="w-full border rounded-xl px-4 py-3" type="password" placeholder="পাসওয়ার্ড" value={form.password}
          onChange={e=>setForm({...form,password:e.target.value})} />
        <button className="w-full bg-[#087f3e] text-white py-3 rounded-xl font-black">
          রেজিস্টার করুন
        </button>
      </form>

      <SocialButtons />

      <p className="text-center mt-6 text-sm text-gray-600">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link to="/signin" className="text-[#087f3e] font-black">সাইন ইন</Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[28px] border p-7 md:p-9 shadow-sm">
        <div className="text-center mb-7">
          <div className="text-5xl">🛒</div>
          <h1 className="text-3xl font-black mt-4">{title}</h1>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SocialButtons() {
  function social(provider) {
    toast(`Demo ${provider} login button. Connect OAuth credentials for production.`);
  }
  return (
    <div className="mt-5">
      <div className="text-center text-gray-400 text-sm mb-3">অথবা</div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={()=>social("Google")} className="border rounded-xl py-3 font-semibold">Google</button>
        <button onClick={()=>social("GitHub")} className="border rounded-xl py-3 font-semibold">GitHub</button>
      </div>
    </div>
  );
}
