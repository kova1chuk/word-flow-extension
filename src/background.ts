// Background service worker for the Chrome extension
console.log("WordFlow Extension: Background service worker loaded");

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("WordFlow Extension installed");
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTabInfo") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true; // Keep message channel open for async response
  }
});
