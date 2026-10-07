import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-8 md:py-14">
      <div className="container-main">
        <div className="hero-pattern rounded-[30px] overflow-hidden text-white">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-7 sm:p-10 md:p-14">
              <span className="inline-flex bg-white/15 border border-white/15 px-4 py-2 rounded-full text-sm mb-5">
                🥬 প্রতিদিনের বাজারের আপডেট
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.12]">
                আজকের বাজার দর
                <br />
                এক নজরে
              </h1>
              <p className="mt-5 text-white/85 text-base md:text-lg leading-8 max-w-xl">
                প্রয়োজনীয় পণ্যের বর্তমান দাম, বাজারভিত্তিক তথ্য এবং প্রতিদিনের
                দাম পরিবর্তন সহজেই দেখুন।
              </p>
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 mt-7 bg-white text-[#087f3e] px-6 py-3 rounded-full font-black hover:scale-105 transition"
              >
                সব পণ্য দেখুন <ArrowDown size={18} />
              </a>
            </div>

            <div className="p-8 md:p-12 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-square rounded-[40px] bg-white/10 border border-white/10 flex items-center justify-center">
                <img
                  src="/bazardor-logo.png"
                  alt="বাজার দর সবজি ঝুড়ি"
                  className="w-[88%] h-[88%] object-contain drop-shadow-2xl"
                />
                <div className="absolute -top-3 right-3 bg-white text-[#087f3e] px-4 py-2 rounded-full font-bold shadow-lg">
                  আজকের দাম ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
