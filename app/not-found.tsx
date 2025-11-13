import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: 'Page was not found - 404',
  description: 'PAGE DOES NOT EXIST',
  
 openGraph: {
title: 'Page was not found',
  description: 'Page you were looking for does not exist',
  url: 'https://notehub.app/404',
  images: [{
   url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
     alt:'page was not found',
     width: 1200,
     height: 600,
  }]
}
};
export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}