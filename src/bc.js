
export function getCdApi() {
  if (typeof window !== "undefined" && window.cdApi) {
    return window.cdApi;
  }
  return null;
}
