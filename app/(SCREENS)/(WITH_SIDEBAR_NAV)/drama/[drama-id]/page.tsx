import allTitles from "@/lib/constants/movies";
import type { TitleFull } from "@/lib/movie-structure/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleItemReel from "./SingleItemReel";

type Props = {
  params: Promise<{ "drama-id": string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsData = await params;
  const title = allTitles.find((t) => t.title_id === paramsData["drama-id"]) as
    | TitleFull
    | undefined;
  if (!title) return { title: "Not found" };
  return { title: `${title.name} — Drama` };
}

export default async function DramaPage({ params, searchParams }: Props) {
  const id = (await params)["drama-id"];
  const title = allTitles.find((t) => t.title_id === id);

  if (!title) return notFound();
  const searchParamsData = await searchParams;
  // support ?open=episodes and ?episode=episode-id
  const initialOpen = searchParamsData?.open === "episodes";
  const initialEpisodeId =
    typeof searchParamsData?.episode === "string"
      ? searchParamsData!.episode
      : null;

  return (
    <SingleItemReel
      title={title}
      initialOpen={initialOpen}
      initialEpisodeId={initialEpisodeId}
    />
  );
}
