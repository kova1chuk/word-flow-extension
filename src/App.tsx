import { useState } from "react";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSignedIn(true);
    setIsLoading(false);
    console.log("Sign in clicked");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    console.log("Sign out clicked");
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
          <p className="text-blue-100 text-sm">
            Enhance your writing experience
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!isSignedIn ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Welcome to WordFlow!
            </h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Sign in to unlock powerful writing tools, AI assistance, and
              productivity features that will transform your writing workflow.
            </p>
            <button
              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Welcome back!
            </h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              You're all set to use WordFlow. Your writing tools are ready and
              waiting.
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm py-3 px-4 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm">
                ✨ AI Assist
              </button>
              <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm py-3 px-4 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm">
                📝 Templates
              </button>
            </div>

            <button
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">Version 0.0.1</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="font-medium">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
