/* jshint esversion: 8 */

/**
 * Filters the URL to remove the `cc.loginfra.com` domain.
 * @param {string} url
 * @returns {(string|null)} The filtered URL or `null` if the URL is not valid.
 */
function filter_url(url) {
  url = new URL(url);

  if (url.hostname === 'cc.loginfra.com') {
    const original_url = url.search.split('&u=')[1];
    if (original_url) {
      const decoded_url = decodeURIComponent(original_url);
      return decoded_url;
    }
  }
}

/**
 * Handles requests that go to `cc.loginfra.com`.
 * @param {object} requestDetails
 * @param {string} requestDetails.url
 * @returns {object} { redirectUrl: string }
 */
function handleBeforeRequest(requestDetails) {
  if (!requestDetails.url) return;

  let url = filter_url(requestDetails.url);

  return { redirectUrl: url };
}

browser.webRequest.onBeforeRequest.addListener(
  handleBeforeRequest,
  { urls: ['https://cc.loginfra.com/*', 'http://cc.loginfra.com/*'] },
  ['blocking']
);
