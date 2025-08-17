import React, { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { ForgotPassword } from "./ForgotPassword";

type AuthView = "signin" | "signup" | "forgot-password";

export const Auth: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>("signin");

  const renderAuthView = () => {
    switch (currentView) {
      case "signin":
        return (
          <SignIn
            onSwitchToSignUp={() => setCurrentView("signup")}
            onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
          />
        );
      case "signup":
        return <SignUp onSwitchToSignIn={() => setCurrentView("signin")} />;
      case "forgot-password":
        return (
          <ForgotPassword onSwitchToSignIn={() => setCurrentView("signin")} />
        );
      default:
        return (
          <SignIn
            onSwitchToSignUp={() => setCurrentView("signup")}
            onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
          />
        );
    }
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
          <p className="text-blue-100 text-sm">Sign in to continue</p>
        </div>
      </div>

      {/* Auth Content */}
      <div className="p-6">{renderAuthView()}</div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center text-xs text-gray-500">
          <span className="font-medium">
            Secure authentication powered by Supabase
          </span>
        </div>
      </div>
    </div>
  );
};
