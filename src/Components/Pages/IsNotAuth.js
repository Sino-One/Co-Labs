import React from "react";

export default function IsNotAuth() {
  return (
    <div className="w-full max-w-xs m-auto my-14">
      <a
        href="/SignIn"
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Attention
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Veuillez vous connecter pour pouvoir accéder au contenu
        </p>
      </a>
    </div>
  );
}
