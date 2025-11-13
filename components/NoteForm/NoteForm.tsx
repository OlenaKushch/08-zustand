'use client';
import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { createNote, NewNoteData, TAGS, type Tags } from "@/lib/api";
import { useRouter } from "next/navigation";
import { NoteTag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";


interface NoteFormProps {
  categories: NoteTag[];
}

export default function NoteForm({ categories }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ['notes'],
        exact: false,
      });

      router.back();
    },
    onError: (error) => {
      console.error("Error note:", error)
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData.entries());
    const noteData = {
      title: (values.title ?? "") as string,
      content: (values.content ?? "") as string,
      tag: (values.tag ?? "") as NoteTag,
    };
    mutate(noteData);
  };

  const handleCancel = () => router.back();

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>


    // <form className={css.form} action={handleSubmit}>
    //   <div className={css.formGroup}>
    //     <label>
    //       Title</label>
    //       <input name="title" className={css.input} defaultValue={draft.title} onChange={handleChange} required />

    //   </div>

    //   <div className={css.formGroup}>
    //     <label>
    //       Content</label>
    //       <textarea name="content" defaultValue={draft.content} onChange={handleChange} />

    //   </div>

    //   <div className={css.formGroup}>
    //     <label>
    //       Category</label>
    //       <select name="tag" defaultValue={draft.tag} onChange={handleChange}>
    //         {TAGS.map((tag) => (
    //           <option key={tag} value={tag}>
    //             {tag}
    //           </option>
    //         ))}
    //       </select>

    //   </div>


    //   <div className={css.actions}>
    //     <button type="submit" className={css.submitButton}>
    //       Create
    //     </button>
    //     <button
    //       type="button"
    //       className={css.cancelButton}
    //       onClick={handleCancel}
    //     >
    //       Cancel
    //     </button>
    //   </div>
    // </form>
  );
}

// interface NoteFormProps {
//   categories: Tags[];
// }
// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title must be at most 50 characters")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content must be at most 500 characters"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Tag is required"),
// });