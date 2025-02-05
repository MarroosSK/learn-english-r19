import { useUser } from "@clerk/clerk-react";
import {
  QueryObserverResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useActionState, useRef, useState } from "react";
import { toast } from "sonner";
import { getUser, makeTestimonial } from "../../api/api-calls";
import { Loader2 } from "lucide-react";
import { TestimonialI } from "@/types/types";

const TestimonialModal = ({
  refetch,
}: {
  refetch: () => Promise<QueryObserverResult<TestimonialI[], Error>>;
}) => {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUser(user?.id as string),
  });

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      const data = {
        userId: user?.id,
        username: userData?.username,
        body: formData.get("body"),
      };

      try {
        await makeTestimonial(data);
        await refetch();
        setOpen(false);
        toast("Testimonial has been created.");

        formRef?.current?.reset();
        queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        console.log(state, prevState);
        return {};
      } catch (error) {
        return { error: "Failed to send message. Please try again." };
      }
    },
    { error: "" }
  );

  const handleModalClose = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <>
      <p
        data-id="feedback-trigger"
        className="mx-auto text-gray-700 transition hover:opacity-75 underline cursor-pointer"
        onClick={() => setOpen(true)}
      >
        here
      </p>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 bg-opacity-25 flex items-center justify-center p-4"
          onClick={handleModalClose}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg max-w-[700px] w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-3 font-bold text-xl text-left">Testimonial</h2>
            {/* {state?.error && <p className="text-red-500">{state.error}</p>} */}

            {isSignedIn ? (
              <div className="flex flex-col gap-y-4">
                {isLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  <form
                    ref={formRef}
                    action={formAction}
                    className="w-full flex flex-col"
                  >
                    <input
                      type="text"
                      name="username"
                      value={userData?.username}
                      disabled
                      data-id="feedback-username-input"
                      className="w-full mt-1 mb-2 resize-none border border-black rounded-md p-2"
                    />
                    <textarea
                      placeholder="What are your thoughts?"
                      className="w-full mt-1 mb-2 resize-none border border-black rounded-md p-2"
                      name="body"
                      required
                      data-id="feedback-body-textarea"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      data-id="feedback-submit-button"
                      className="cursor-pointer bg-stone-800 text-lg px-4 py-2 rounded-md  hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                    >
                      {isPending ? "Sending..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Please sign in first.</p>
            )}

            {/* Close Button */}
            <button
              className="mt-3 cursor-pointer bg-stone-800 text-lg px-4 py-2 rounded-md  hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialModal;
