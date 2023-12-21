import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { encrypt } from "@/utils/encryption";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from 'next-auth/providers/keycloak';
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
    const keycloakParams = new URLSearchParams();
    keycloakParams.append('client_id', process.env.KEYCLOAK_CLIENT_ID as string);
    keycloakParams.append('client_secret', process.env.KEYCLOAK_SECRET as string);
    keycloakParams.append('grant_type', 'refresh_token');
    keycloakParams.append('refresh_token', token.refresh_token);
    const resp = await fetch(`${process.env.KEYCLOAK_TOKEN_URL as string}?${keycloakParams}`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        method: "POST",
    });
    const refreshToken = await resp.json();
    console.log(refreshToken);
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwtDecode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    };
}

export const options: NextAuthOptions = {
    providers: [
        // CredentialsProvider({
        //     name: 'Credentials',
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "Please Enter Your Username" },
        //         password: { label: "Password", type: "password", placeholder: "Please Enter your Password" }
        //     },
        //     async authorize(credentials, req) {
        //         const user = { id: '42', name: 'Dave', password: 'author' }
        //         if (credentials?.username === user.name && credentials.password === user.password) {
        //             return user
        //         } else {
        //             return null
        //         }
        //     }
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
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
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token, account }: any) {
            // const nowTimeStamp = Math.floor(Date.now() / 1000);
            // if (account) {
            //     token.decoded = jwtDecode(account.access_token);
            //     token.access_token = account.access_token;
            //     token.id_token = account.id_token;
            //     token.expires_at = account.expires_at;
            //     token.refresh_token = account.refresh_token;
            //     return token;
            // } else if (nowTimeStamp < token.expires_at) {
            //     // token has not expired yet, return it
            //     console.log("Token not expired")
            //     return token;
            // } else {
            //     return token
            //     // token is expired, try to refresh it
            //     console.log("Token has expired. Will refresh...")
            //     try {
            //         const refreshedToken = await refreshAccessToken(token);
            //         console.log("Token is refreshed.");
            //         return refreshedToken;
            //     } catch (error) {
            //         console.error("Error refreshing access token", error);
            //         return { ...token, error: "RefreshAccessTokenError" };
            //     }
            // }
            return token
        },
        async session({ session, user, token }: any) {
            // session.access_token = encrypt(token?.access_token);
            // session.id_token = encrypt(token?.id_token);
            // session.roles = token?.decoded?.realm_access?.roles;
            return session
        },
    }
}