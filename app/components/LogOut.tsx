'use client';
import React from 'react';
import {signOut} from "next-auth/react";

export default  function LogOut(props) {
    async function handleLogout() {
        await signOut();
    }

    return (
        <button onClick={handleLogout}>
            Log out!
        </button>
    );
}