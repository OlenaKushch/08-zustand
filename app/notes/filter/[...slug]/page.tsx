import { fetchNoteById, fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FilterPageClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;

}
export const generateMetadata = async ({ params }: FilterPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const filtered = slug?.[0];
  const category: NoteTag | undefined =
    filtered && filtered !== "all" ? (filtered as NoteTag) : undefined;


  const title = `Notes filtered by: ${category}`;
  const description = `Review of notes filtered by "${category}".`;
  const url = `https://notehub.com/notes/filter/${slug[0]}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Title",
        },
      ],
      },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {

const { slug } = await params;
  const filtered = slug?.[0];
  const category: NoteTag | undefined =
    filtered && filtered !== "all" ? (filtered as NoteTag) : undefined;


  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () => fetchNotes({
      page: 1,
      search: '',
      perPage: 12,
      tag: category,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterPageClient category={category} />
    </HydrationBoundary>
  );
}






