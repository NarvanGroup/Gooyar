import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Adds an array of key-value pairs to the current URL as search params.
 * @param paramsArray Array of objects containing key and value.
 * @param router Next.js useRouter object.
 */
export function addSearchParams(
  paramsArray: { key: string; value: string }[],
  router: AppRouterInstance
) {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;

  // Loop through the array of key-value pairs and add them to the search params
  paramsArray.forEach(({ key, value }) => {
    searchParams.set(key, value);
  });

  // Push the updated URL with all the new search params
  router.push(`${currentUrl.pathname}?${searchParams.toString()}`);
}
