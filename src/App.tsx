import { useState, useEffect } from "react";

interface StoredText {
  selectedText?: string;
  sourceUrl?: string;
  timestamp?: number;
}

function App() {
  const [storedText, setStoredText] = useState<StoredText | null>(null);
  const [isProcessingText, setIsProcessingText] = useState(false);

  // Check for stored text when component mounts
  useEffect(() => {
    checkForStoredText();
  }, []);

  const checkForStoredText = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        action: "getStoredText",
      });
      if (response && response.selectedText) {
        setStoredText(response);
      }
    } catch (error) {
      console.log("No stored text found or error occurred");
    }
  };

  const clearStoredText = async () => {
    try {
      await chrome.runtime.sendMessage({ action: "clearStoredText" });
      setStoredText(null);
    } catch (error) {
      console.error("Error clearing stored text:", error);
    }
  };

  const handleProcessText = async () => {
    if (!storedText?.selectedText) return;

    setIsProcessingText(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessingText(false);

    // Here you would integrate with your AI service
    console.log("Processing text with AI:", storedText.selectedText);
  };

  return (
    <div className="w-96 min-h-[500px] bg-white text-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
            <span className="text-xl">✍️</span>
          </div>
          <h1 className="text-xl font-bold mb-1">WordFlow</h1>
          <p className="text-blue-100 text-sm">Process selected text with AI</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Selected Text Display */}
        {storedText?.selectedText ? (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-900">
                Selected Text
              </h3>
              <button
                onClick={clearStoredText}
                className="text-blue-500 hover:text-blue-700 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-blue-800 mb-3 leading-relaxed max-h-24 overflow-y-auto">
              "{storedText.selectedText}"
            </div>
            {storedText.sourceUrl && (
              <div className="text-xs text-blue-600 mb-3 truncate">
                Source: {storedText.sourceUrl}
              </div>
            )}
            <button
              onClick={handleProcessText}
              disabled={isProcessingText}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-md transition-colors duration-200"
            >
              {isProcessingText ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "🤖 Process with AI"
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              No Text Selected
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Select text on any webpage, right-click, and choose "WordFlow:
              Process with AI" from the context menu to get started.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">Version 0.0.1</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
