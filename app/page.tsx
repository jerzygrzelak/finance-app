
import LogOut from "@/components/LogOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PageHeader from '@/components/PageHeader';
import AddBankDialog from '@/app/(pages)/accounts/dialogs/AddBankDialog';
import BanksContainer from '@/app/(pages)/accounts/components/BanksContainer';
import React from 'react';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (session) {
    const username = session?.user.username;
    return (
        <div className="ml-5 md:ml-64 mr-5 mb-5">
          <PageHeader headerText={username && `Hello, ${username}!`} />
        </div>
    );
  } else {
    redirect("/auth/login");
  }
}
