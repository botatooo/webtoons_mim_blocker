/* jshint esversion: 8 */

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
