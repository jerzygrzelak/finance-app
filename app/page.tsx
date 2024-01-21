import LogOut from "@/app/components/LogOut";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
    const session = await getServerSession(authOptions);

  return (
    <main>
     ELO
        <p>{JSON.stringify(session)}</p>
        <LogOut/>
    </main>
  );
}
