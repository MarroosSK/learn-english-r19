import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { editUser, getOrCreateUser } from "../api/api-calls";
import ProfileHero from "../components/sections/profile/profile-hero";
import ProfileList from "../components/sections/profile/profile-list";
import { EditIcon, Loader2 } from "lucide-react";

const PageProfile = () => {
  const { isSignedIn, user } = useUser();
  const ref = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticUsername, setOptimisticUsername] = useState<string>("");

  const {
    data: currentUser,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["currentUser", user?.id],
    queryFn: () => (user?.id ? getOrCreateUser(user) : null),
    enabled: !!user?.id,
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [
    state = {
      success: false,
      error: "",
    },
    formAction,
    isPending,
  ] = useActionState(
    async (
      prevState: { success?: boolean; error?: string },
      formData: FormData
    ) => {
      setIsEditing(true);

      const newUsername = formData.get("username") as string;
      const data = {
        userId: user?.id,
        username: newUsername,
      };
      setOptimisticUsername(newUsername);

      try {
        await editUser(data);
        await refetch();
        toast("Username has been updated.");
        queryClient.invalidateQueries({ queryKey: ["currentUser", user?.id] });
        return { success: true };
      } catch (error) {
        console.error("Error updating username:", error);
        setOptimisticUsername(currentUser?.username || "");
        return { error: "Failed to update username. Please try again." };
      } finally {
        setIsEditing(false);
      }
    },
    { success: false, error: undefined }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <ProfileHero />
      <div className="min-h-screen max-w-7xl mx-auto px-4 m-4">
        {isSignedIn ? (
          <div className="grid md:grid-cols-12 gap-5 p-4 m-2">
            <div className="md:col-span-9 p-4">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <h2 className="text-stone-500 text-2xl font-semibold">
                    Welcome,{" "}
                    {isPending ? currentUser?.username : optimisticUsername}
                  </h2>
                  <p className="text-stone-800 font-bold">
                    {currentUser?.role}
                  </p>

                  <form
                    ref={ref}
                    action={formAction}
                    className="py-10 flex flex-col sm:flex-row items-center gap-2"
                  >
                    <input
                      className="w-1/2"
                      type="text"
                      name="username"
                      defaultValue={optimisticUsername || currentUser?.username}
                      disabled={!isEditing}
                    />
                    <button
                      type="button"
                      className="cursor-pointer bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                      onClick={() => setIsEditing((prev) => !prev)}
                    >
                      {isEditing ? "Cancel" : <EditIcon />}
                    </button>
                    {isEditing && (
                      <button
                        type="submit"
                        className="ml-2 bg-green-600 hover:bg-stone-300 text-lg px-4 py-2 rounded-md text-white cursor-pointer"
                      >
                        {isPending ? "Saving..." : "Save"}
                      </button>
                    )}
                  </form>

                  <ProfileList currentUser={currentUser} refetch={refetch} />
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            Profile is available only for registered users.
          </p>
        )}
      </div>
    </section>
  );
};

export default PageProfile;
