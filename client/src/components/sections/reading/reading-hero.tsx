import readingBg from "@/assets/reading-bg.webp";

const ReadingHero = () => {
  return (
    <div className="relative ">
      <img
        src={readingBg}
        height="600px"
        width="600px"
        className="w-full h-screen object-cover"
        alt="Reading Background"
      />
      <h2 className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-2xl sm:text-4xl font-bold tracking-tight ">
        READING
      </h2>
    </div>
  );
};

export default ReadingHero;
