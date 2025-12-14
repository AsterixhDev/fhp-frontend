import { PropsWithChildren } from "react";

export default function PageScreen({ children }: PropsWithChildren) {
  return <main className="size-full bg-gray-800  isolate relative md:rounded-lg overflow-hidden">{children}</main>;
}
