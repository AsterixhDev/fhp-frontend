import { PropsWithChildren } from "react";
import './_assets/_css/layout.tailwind.css';
import PageScreen from "./_components/PageScreen";
import Sidebar from "./_components/Sidebar";
import { getPathnameOnServerSide } from "@/lib/getPathnameOnServerSide";

export default async function ScreenWithSidebarLayout({
  children,
}: PropsWithChildren) {
  const pathname = await getPathnameOnServerSide()
  return (
    <div className="size-full flex flex-col-reverse md:grid grid-cols-1 md:gap-2 md:grid-cols-[2fr_5fr] md:max-w-6xl md:mx-auto md:p-4">
      <Sidebar initialPathname={pathname} />
      <PageScreen>{children}</PageScreen>
    </div>
  );
}
