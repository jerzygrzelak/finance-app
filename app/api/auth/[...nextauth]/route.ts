import prisma from "@/app/lib/prisma";
import {Account, AuthOptions, NextAuthOptions, Profile, Session, User} from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import {session} from "next-auth/core/routes";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'username'
                },
                password: {
                    label: 'Password',
                    type: 'password'
                }
            },
            authorize: async (credentials) => {
                if(!credentials) {
                    return null;
                }
                console.log(credentials);
                const { username, password } = credentials;
                const user = await prisma.user.findUnique({
                    where: {
                        username,
                    }
                });
                console.log(user);
                if(!user) {
                    return null;
                }

                const userPassword = user.password;
                const isValidPassword = bcrypt.compareSync(password, userPassword);

                if(!isValidPassword) {
                    return null;
                }
                console.log(isValidPassword)
                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}) {
            if(!token) {
                throw new Error('No token to encode');
            }

            return jwt.sign(token, secret);
        },
        async decode({secret, token}) {
            if(!token) {
                throw new Error('No token to decode');
            }
            const decodedToken = jwt.verify(token, secret);

            if(typeof decodedToken === 'string') {
                return JSON.parse(decodedToken);
            } else {
                return decodedToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        // 30 days
        maxAge: 30 * 24 * 60 * 60,
        // 24 hours
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        // async session(params: {session: Session; token: JWT; user: any}) {
        //     console.log(params)
        //     if(params.session.user) {
        //         params.user.username = params.token.username;
        //     }
        //
        //     return params.session;
        // },
        // async jwt(params: {
        //     token: JWT;
        //     user?: User | undefined;
        //     account?: Account | null | undefined;
        //     profile?: Profile | undefined;
        //     isNewUser?: boolean | undefined;
        // }) {
        //     console.log(params);
        //     if(params.user) {
        //         params.token.username = params.user.username;
        //     }
        //
        //     return params.token;
        // }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };