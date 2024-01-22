import LogOut from "@/components/LogOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    const username = session?.user.username;
    return (
      <main>
        {username && <p>Hello, {username}!</p>}
        <LogOut />
      </main>
    );
  } else {
    redirect("/auth/login");
  }
}
