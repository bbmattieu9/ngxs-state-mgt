import { environment } from "../../../environments/environmrnt";

/**
 * Builds a versioned API path.
 * @param path The endpoint path (after /api/vrsnNumbar/)
 * @returns Full versioned API URL
 */


export function buildApiPath(path: string): string {
  const version = environment.APP_CREDENTIAL.LATEST_VERSION;
  return `${environment.BASE_URL}api/v${version}/${path}`;
}
