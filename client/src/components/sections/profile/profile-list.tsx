import { useState } from "react";
import { X, EditIcon, Save, Trash } from "lucide-react";
import { editWord, handleDelete } from "@/api/api-calls";
import { CurrentUserI, WordI } from "@/types/types";
import { toast } from "sonner";

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

  const handleEdit = async (wordId: string, word: string) => {
    if (!editedMeaning.trim()) return;

    const data: WordI = {
      userId: currentUser.id,
      word: word,
      meaning: editedMeaning,
    };

    // Store the current meaning to revert if needed
    const previousMeaning =
      currentUser.vocabulary.find((w) => w.id === wordId)?.meaning || "";

    setOptimisticMeaning(editedMeaning);
    setEditMode(null);

    try {
      await editWord(data);
      toast("Word updated!");
      refetch();
      return {};
    } catch (error) {
      // Rollback to previous meaning in case of error
      toast.error("Failed to update word. Please try again.");
      setOptimisticMeaning(previousMeaning);
      return error;
    }
  };

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
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Word</th>
            <th className="border px-4 py-2">Meaning</th>
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
                    <input
                      type="text"
                      value={editedMeaning}
                      onChange={(e) => setEditedMeaning(e.target.value)}
                      className="w-full p-1 border border-gray-300"
                    />
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
                        onClick={() => handleEdit(word.id, word.word)}
                        className="bg-green-500 hover:bg-green-300 text-white p-2 cursor-pointer"
                      >
                        <Save size={16} />
                      </button>

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
