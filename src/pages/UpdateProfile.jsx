import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser, saveUser, getAccount, saveAccount } from "../utils/auth";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const user = getUser();
  const [name, setName] = useState(user?.name || "");

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    const updatedUser = { ...user, name: name.trim() };
    saveUser(updatedUser);

    const account = getAccount();
    if (account) saveAccount({ ...account, name: name.trim() });

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    navigate("/profile");
  }

  return (
    <div className="container-main py-12 md:py-16">
      <div className="max-w-xl mx-auto bg-white border rounded-[28px] p-7 md:p-10">
        <h1 className="text-3xl font-black">তথ্য আপডেট করুন</h1>
        <p className="text-gray-500 mt-2">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>

        <form onSubmit={submit} className="mt-7 space-y-5">
          <div>
            <label className="block font-bold mb-2">নাম</label>
            <input className="w-full border rounded-xl px-4 py-3" value={name}
              onChange={e=>setName(e.target.value)} placeholder="আপনার নাম" />
          </div>
          <button className="w-full bg-[#087f3e] text-white py-3 rounded-xl font-black">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
}
