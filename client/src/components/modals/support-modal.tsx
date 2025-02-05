import { useUser } from "@clerk/clerk-react";
import React, { useActionState, useRef, useState } from "react";
import { toast } from "sonner";
import { sendSupportMsg } from "../../api/api-calls";
import { Loader2 } from "lucide-react";

const SupportModal = () => {
  const { isSignedIn, user } = useUser();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [state, formAction, isPending] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      const data = {
        userId: user?.id,
        title: formData.get("postId"),
        body: formData.get("comment"),
      };

      try {
        await sendSupportMsg(data);
        toast("Message has been sent.");

        formRef?.current?.reset();
        setOpen(false);
        console.log(state, prevState);
        return {};
      } catch (error) {
        return { error: "Failed to send message. Please try again." };
      }
    },
    {}
  );

  const handleModalClose = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <>
      <p
        data-id="support-trigger"
        className="mx-auto text-gray-700 transition hover:opacity-75 underline cursor-pointer"
        onClick={() => setOpen(true)}
      >
        support
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
            <h2 className="font-bold text-xl text-left mb-3">Support</h2>

            {isSignedIn ? (
              <div className="flex flex-col gap-y-4">
                {isPending ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  <form
                    ref={formRef}
                    action={formAction}
                    className="w-full flex flex-col "
                  >
                    <input
                      type="text"
                      name="postId"
                      placeholder="Title"
                      data-id="support-title-input"
                      className="w-full mt-1 mb-2 resize-none border border-black rounded-md p-2"
                    />
                    <textarea
                      placeholder="What are your thoughts?"
                      className="w-full mt-1 mb-2 resize-none border border-black rounded-md p-2"
                      name="comment"
                      required
                      data-id="support-comment-textarea"
                    />
                    <button
                      type="submit"
                      disabled={isPending}
                      data-id="support-submit-button"
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

export default SupportModal;
