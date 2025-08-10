// Background service worker for the Chrome extension
console.log("WordFlow Extension: Background service worker loaded");

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("WordFlow Extension installed");

  // Create context menu for text selection
  chrome.contextMenus.create({
    id: "wordflow-text-selection",
    title: "WordFlow: Process with AI",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"],
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "wordflow-text-selection" && info.selectionText) {
    // Store selected text for popup access
    chrome.storage.local.set({
      selectedText: info.selectionText,
      sourceUrl: tab?.url || "",
      timestamp: Date.now(),
    });

    // Open the extension popup
    chrome.action.openPopup();
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStoredText") {
    chrome.storage.local.get(
      ["selectedText", "sourceUrl", "timestamp"],
      (result) => {
        sendResponse(result);
      }
    );
    return true;
  }

  if (request.action === "clearStoredText") {
    chrome.storage.local.remove(
      ["selectedText", "sourceUrl", "timestamp"],
      () => {
        sendResponse({ success: true });
      }
    );
    return true;
  }
});
