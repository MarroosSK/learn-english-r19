import { useState } from "react";
import { X, EditIcon, Trash } from "lucide-react";
import { editWord, handleDelete } from "@/api/api-calls";
import { CurrentUserI, WordI } from "@/types/types";
import { toast } from "sonner";
import { useActionState } from "react";
import { Link } from "react-router";

const ProfileList = ({
  currentUser,
  refetch,
}: {
  currentUser: CurrentUserI;
  refetch: () => void;
}) => {
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editedMeaning, setEditedMeaning] = useState<string>("");
  const [optimisticMeaning, setOptimisticMeaning] = useState<string>("");

  const [state, formAction] = useActionState(
    async (prevState: { error?: string }, formData: FormData) => {
      const wordId = formData.get("wordId") as string;
      const word = formData.get("word") as string;
      const meaning = formData.get("meaning") as string;

      if (!meaning.trim()) return prevState;

      const data: WordI = {
        userId: currentUser.id,
        word,
        meaning,
      };
      const previousMeaning =
        currentUser.vocabulary.find((w) => w.id === wordId)?.meaning || "";
      setOptimisticMeaning(meaning);
      setEditMode(null);

      // console.log("Submitting data: ", data);

      try {
        await editWord(data);
        toast("Word updated!");
        refetch();
        console.log(state);

        return {};
      } catch (error) {
        console.log(error);

        toast.error("Failed to update word. Please try again.");
        setOptimisticMeaning(previousMeaning);
        return { error: "Update failed" };
      }
    },
    {}
  );

  const onDelete = async (wordId: string) => {
    try {
      await handleDelete(wordId);
      refetch();
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  return (
    <div>
      <Link
        to={"/vocabulary"}
        className="bg-stone-800 p-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
      >
        Add Words
      </Link>
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Word</th>
            <th className="border px-4 py-2">Meaning (in your language)</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUser?.vocabulary?.length ? (
            currentUser.vocabulary.map((word) => (
              <tr key={word.id} className="text-center">
                <td className="border px-4 py-2">{word.word}</td>
                <td className="border px-4 py-2">
                  {editMode === word.id ? (
                    <form action={formAction}>
                      <input type="hidden" name="wordId" value={word.id} />
                      <input type="hidden" name="word" value={word.word} />
                      <input
                        type="text"
                        name="meaning"
                        value={editedMeaning}
                        onChange={(e) => setEditedMeaning(e.target.value)}
                        className="w-full p-1 border border-gray-300"
                      />
                    </form>
                  ) : optimisticMeaning &&
                    optimisticMeaning === word.meaning ? (
                    optimisticMeaning
                  ) : (
                    word.meaning || "No definition yet"
                  )}
                </td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  {editMode === word.id ? (
                    <>
                      <button
                        onClick={() => setEditMode(null)}
                        className="bg-stone-500 hover:bg-stone-300 text-white p-2 cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditMode(word.id);
                          setEditedMeaning(word.meaning || "");
                        }}
                        className="bg-stone-500 hover:bg-stone-300 text-white p-2 cursor-pointer"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(word.id)}
                        className="bg-red-500 hover:bg-red-300 text-white p-2 cursor-pointer"
                      >
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="border px-4 py-2 text-center text-gray-500"
              >
                No words added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;
