import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import KeycloakProvider from 'next-auth/providers/keycloak';
import GoogleProvider from "next-auth/providers/google";
export const options: NextAuthOptions = {
    providers: [

        // GitHubProvider({
        //     clientId: '628c5ee444b0facfe8b6',
        //     clientSecret: '6a0d2cfd67d443bff21def2fc451daaebcda72df'
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Please Enter Your Username" },
                password: { label: "Password", type: "password", placeholder: "Please Enter your Password" }
            },
            async authorize(credentials, req) {
                const user = { id: '42', name: 'Dave', password: 'author' }
                if (credentials?.username === user.name && credentials.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
        KeycloakProvider({
            id: 'keycloak',
            name: 'Keycloak',
            clientId: process.env.KEYCLOAK_CLIENT_ID as string,
            clientSecret: process.env.KEYCLOAK_SECRET as string,
            issuer: process.env.KEYCLOAK_ISSUER as string,
            requestTokenUrl: process.env.KEYCLOAK_TOKEN_URL as string,
            authorization: {
                params: {
                    scope: 'openid email profile',
                }
            },
            checks: ['pkce', 'state'],
            idToken: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    ...profile
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/Login'
    },
    callbacks: {
        async signIn({ account, user }) {
            console.log("hello user your details");

            console.log(user);
            return true
        },
    }
}