export default function Footer() {
  return (
    <footer className="bg-[#10251a] text-white mt-16">
      <div className="container-main py-10">
        <div className="flex flex-col md:flex-row justify-between gap-7">
          <div>
            <div className="font-black text-2xl">বাজার দর</div>
            <p className="text-white/60 mt-2">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
          <p className="text-white/60 max-w-xl md:text-right leading-7">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
        <div className="border-t border-white/10 mt-8 pt-5 text-sm text-white/45">
          © ২০২৬ বাজার দর — BazarDor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
