import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};
export async function generateMetadata(
  {params}: Props): Promise<Metadata> {
    const {id} = params;
    
    const note = await fetchNoteById(id);
    
    return {
      title: note.title ? `{note.title} | NoteHub` : 'Note details',
      description: note.content?.slice(0,120) ?? 'Note details page',

    };
  }


export default async function ModalNotePage({ params }: Props) {

  const { id } = await params;
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}