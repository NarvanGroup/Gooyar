import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Removes an array of keys from the current URL search params.
 * @param keysArray Array of keys to remove from the search params.
 * @param router Next.js useRouter object.
 */
export function removeSearchParams(
  keysArray: string[],
  router: AppRouterInstance
) {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;

  // Loop through the array of keys and delete each from the search params
  keysArray.forEach((key) => {
    searchParams.delete(key);
  });

  // Push the updated URL with the search params removed
  router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
}
