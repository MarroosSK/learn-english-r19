import profileBg from "@/assets/profile-bg.webp";

const ProfileHero = () => {
  return (
    <div className="relative ">
      <img
        src={profileBg}
        height="600px"
        width="600px"
        className="w-full h-screen object-cover"
        alt="Reading Background"
      />
      <h2 className="absolute bottom-10 left-6 z-[10] p-6 bg-white  text-2xl sm:text-4xl font-bold tracking-tight ">
        PROFILE
      </h2>
    </div>
  );
};

export default ProfileHero;
