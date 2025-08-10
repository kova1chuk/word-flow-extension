// Content script that runs on web pages
console.log("WordFlow Extension: Content script loaded");

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageText") {
    const pageText = document.body.innerText;
    sendResponse({ text: pageText });
  }
});
