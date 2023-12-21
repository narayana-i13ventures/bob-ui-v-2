import { withAuthProvider } from "./withAuthorization";

export default withAuthProvider('keycloak');

// You could also use the standard withAuth, and specify the provider. e.g. withAuth({ provider: 'keycloak' })

// export const config = {
//     matcher: [
//         // Example of securing anything under /secured
//         "/Dashboard",
//     ],
// };