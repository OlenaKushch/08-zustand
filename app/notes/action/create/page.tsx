
import { Metadata } from "next";
import css from './CreateNote.module.css';
import NoteForm from "@/components/NoteForm/NoteForm";
import { TAGS } from "@/lib/api";


export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note quickly and easily in NoteHub.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Add your new note and organize your thoughts in NoteHub.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "notehub-logo",
        width: 1200,
        height: 630,
      },
    ],
  },
};


export default function CreateNote() {
  return (
  <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm categories={TAGS}/>
    </div>
  </main>
  )
}