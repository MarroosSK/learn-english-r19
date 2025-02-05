import homeBg from "@/assets/home-bg.webp";

const HomeHero = () => {
  return (
    <div className="relative">
      <img
        src={homeBg}
        height="600px"
        width="600px"
        className="w-full h-screen object-cover"
        alt="Study Background"
      />
      <h1
        data-id="hero-home-heading"
        className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-2xl sm:text-4xl font-bold tracking-tight "
      >
        {`Study English online`}
      </h1>
    </div>
  );
};

export default HomeHero;
