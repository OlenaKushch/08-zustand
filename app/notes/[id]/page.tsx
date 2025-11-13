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
    

      const title =  note.title ? `{note.title} | NoteHub` : 'Note details';
      const description = note.content?.slice(0,120) ?? 'Note details page';

    return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}


export default async function ModalNotePage({ params }: Props) {

  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}