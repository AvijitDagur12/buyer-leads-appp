import { redirect } from "next/navigation";

export default function Home() {
  redirect("/buyer-form");
  return null;
}
