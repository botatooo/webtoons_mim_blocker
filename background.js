/* jshint esversion: 8 */

/**
 * @typedef {object} responseDetails
 * @property {string} redirectUrl
 */

/**
 * Filters the URL to remove the `cc.loginfra.com` domain.
 * @param {string} url
 * @returns {(string|undefined)} The filtered URL or nothing if the URL is not valid,
 * if the url's host is not `cc.loginfra.com`,
 * or if the url does not have a redirect url ('&u=' search param)
 */
function filter_url(url) {
  try {
    url = new URL(url);
  } catch (error) {
    return;
  }

  if (url.hostname !== 'cc.loginfra.com') return;

  const original_url = url.search.split('&u=')[1];
  if (!original_url) return;

  const decoded_url = decodeURIComponent(original_url);
  return decoded_url;
}

/**
 * Handles requests that go to `cc.loginfra.com`.
 * @param {object} requestDetails
 * @param {string} requestDetails.url
 * @returns {responseDetails}
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
