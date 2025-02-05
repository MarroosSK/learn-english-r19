import vocabularyBg from "@/assets/vocabulary-bg.webp";

const VocabularyHero = () => {
  return (
    <div className="relative ">
      <img
        src={vocabularyBg}
        height="600px"
        width="600px"
        className="w-full h-screen object-cover"
        alt="Vocabulary Background"
      />
      <h2 className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-2xl sm:text-4xl font-bold tracking-tight ">
        VOCABULARY
      </h2>
    </div>
  );
};

export default VocabularyHero;
