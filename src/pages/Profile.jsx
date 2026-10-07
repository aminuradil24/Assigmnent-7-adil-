import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser, logoutUser } from "../utils/auth";

export default function Profile() {
  const user = getUser();
  const navigate = useNavigate();

  function logout() {
    logoutUser();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    navigate("/");
  }

  return (
    <div className="container-main py-12 md:py-16">
      <div className="max-w-2xl mx-auto bg-white border rounded-[28px] p-7 md:p-10">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto">👤</div>
        <h1 className="text-3xl font-black text-center mt-5">আমার প্রোফাইল</h1>

        <div className="mt-8 space-y-4">
          <Info label="নাম" value={user?.name} />
          <Info label="ইমেইল" value={user?.email} />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-8">
          <Link to="/profile/update" className="text-center bg-[#087f3e] text-white py-3 rounded-xl font-black">
            তথ্য আপডেট করুন
          </Link>
          <button onClick={logout} className="border border-red-200 text-red-600 py-3 rounded-xl font-black">
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({label,value}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold mt-1">{value || "—"}</p>
    </div>
  );
}
