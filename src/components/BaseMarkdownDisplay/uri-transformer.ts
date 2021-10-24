/** From https://github.com/remarkjs/react-markdown/blob/main/lib/uri-transformer.js */
import { profileReadmeBaseUrl } from "../../utils/github/searchRepos";

const protocols = ["http", "https", "mailto", "tel"];

/**
 * @param {string} uri
 * @returns {string}
 */
export function makeUriTransformer(
  login: string,
  defaultBranchName: string,
  mode: "user" | "organization"
): (uri: string) => string {
  const baseUrl = profileReadmeBaseUrl(login, defaultBranchName, mode);
  return function uriTransformer(uri: string) {
    const url = (uri || "").trim();
    const first = url.charAt(0);

    if (first === "/") {
      return `${baseUrl}${url}`;
    }

    if (first === "#") {
      return url;
    }

    const colon = url.indexOf(":");
    if (colon === -1) {
      return url;
    }

    let index = -1;

    // eslint-disable-next-line no-plusplus
    while (++index < protocols.length) {
      const protocol = protocols[index];

      if (
        colon === protocol.length &&
        url.slice(0, protocol.length).toLowerCase() === protocol
      ) {
        return url;
      }
    }

    index = url.indexOf("?");
    if (index !== -1 && colon > index) {
      return url;
    }

    index = url.indexOf("#");
    if (index !== -1 && colon > index) {
      return url;
    }

    // eslint-disable-next-line no-script-url
    return "javascript:void(0)";
  };
}
