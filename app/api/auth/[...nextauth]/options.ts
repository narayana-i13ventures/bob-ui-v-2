import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import { encrypt } from "@/utils/encryption";
import GoogleProvider from "next-auth/providers/google";
import KeycloakProvider from 'next-auth/providers/keycloak';
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import moment from "moment";
const logoutUserFromProvider = async (endsessionParam: string) => {
    try {
        const { status, statusText } = await fetch(endsessionParam, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        console.log(statusText);
    } catch (err) {
        console.log(err)
    }
}

const refreshAccessToken = async (token: JWT) => {
    try {
        const details = {
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_SECRET,
            grant_type: ['refresh_token'],
            refresh_token: token.refresh_token,
        };
        const formBody: string[] = [];
        Object.entries(details).forEach(([key, value]: [string, any]) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            formBody.push(encodedKey + '=' + encodedValue);
        });
        const formData = formBody.join('&');
        const url = `${process.env.KEYCLOAK_TOKEN_URL}/token`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formData,
        });
        const refreshedTokens = await response.json();
        if (!response.ok) throw refreshedTokens;
        return {
            ...token
        };
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
};
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
    events: {
        async signOut(message: any) {
            try {
                if (message.token && process.env.NEXTAUTH_URL) {
                    if (!message.token.id_token) console.warn("Without an id_token the user won't be redirected back from the IdP after logout.")
                    const endsessionURL = `https://i13ventureskeycloak.azurewebsites.net/realms/Bob/protocol/openid-connect/logout`

                    if (typeof message.token.id_token === 'string') {
                        const endsessionParams: URLSearchParams = new URLSearchParams({
                            id_token_hint: message.token.id_token,
                        })
                        logoutUserFromProvider(`${endsessionURL}?${endsessionParams}`);
                    } else {
                        // console.error("id Token is not a string.");
                        // Handle the error or log accordingly
                    }
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
    callbacks: {
        async jwt({ token, account }: any) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {
                console.log(account);
                token.decoded = jwtDecode(account?.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            } else if (nowTimeStamp < token.expires_at) {
                return token;
            } else {
                try {
                    const refreshedToken: any = await refreshAccessToken(token);
                    return refreshedToken;
                } catch (error) {
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },
        async session({ session, user, token }: any) {
            session.access_token = token?.access_token;
            session.id_token = token?.id_token;
            session.roles = token?.decoded?.realm_access?.roles;
            return session
        },
    }
}