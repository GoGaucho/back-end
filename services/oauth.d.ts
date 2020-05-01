/** the default scopes for OAUTH */
export const DefaultScopes: string[];

/** get the google OAUTH url.
 * @param refresh true if retrieve a refresh token. Otherwise, retrieve a user token
 * @param redirect the url that this OAUTH page will redirect to upon completion
 * @param scopes the scope of authorization this OAUTH page will ask for
*/
export function GetAuthUrl(refresh: boolean, redirect: string, scopes: string[]): string;

/** get JWT from auth code.
 * @param code the auth code
*/
export async function GetToken(code: string): string;