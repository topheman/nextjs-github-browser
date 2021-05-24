/* eslint-disable no-underscore-dangle */
import { User, Organization } from "../libs/graphql";

/**
 * - Using type predicates: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 * - Using assertion functions: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
 */

export function isUser(userLikeObject: unknown): userLikeObject is User {
  if ((userLikeObject as User)?.__typename === "User") {
    return true;
  }
  return false;
}

export function isOrganization(
  organizationLikeObject: unknown
): organizationLikeObject is Organization {
  if ((organizationLikeObject as Organization)?.__typename === "Organization") {
    return true;
  }
  return false;
}
