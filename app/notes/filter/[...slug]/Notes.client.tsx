
"use client";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

interface FilterPageProps {
  category?: NoteTag;
}

export default function FilterPageClient({ category }: FilterPageProps) {
  const [localQuery, setLocalQuery] = useState("");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const changeQuery = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 700);

  const { data, isError, isSuccess } = useQuery({
    queryKey: ["notes", query, currentPage, category],
    queryFn: () => fetchNotes({
      page: currentPage,
      perPage: 12,
      search: query,
      tag: category,
    }),
    placeholderData: keepPreviousData,

  });
  useEffect(() => {
    if (isError) {
      toast("Sorry, something went wrong, please try again");
    }
  }, [isError]);

  const handleSearchChange = (value: string) => {
    setLocalQuery(value);  // миттєве оновлення інпута
    changeQuery(value);    // debounce оновлення query
  };
  // const changeQuery = useDebouncedCallback((query: string) => {
  //   setQuery(query);
  //   setCurrentPage(1);
  // }, 1000);


  return (

    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={localQuery} onChange={handleSearchChange} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <Toaster position="top-right" />

      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
