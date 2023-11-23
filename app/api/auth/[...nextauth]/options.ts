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
            clientId: '415317828175-tlr8pb7pj01e74pkvrlj9h8os4qtbdq2.apps.googleusercontent.com',
            clientSecret: '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',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        KeycloakProvider({
            id: 'keycloak',
            name: 'Keycloak',
            clientId: 'bobUI',
            clientSecret: 'p2xBq0AHi0s9CEW3qGBQnBw6XRyRLETB',
            issuer: 'https://i13ventureskeycloak.azurewebsites.net/realms/Bob',
            requestTokenUrl: 'https://i13ventureskeycloak.azurewebsites.net/realms/Bob/protocol/openid-connect/auth',
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