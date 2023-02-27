import { languages } from "@/datas/data";
import { Language } from "@/ts/interfaces/interface";
import { useRouter } from "next/router";
import { useState } from "react";

export default function useLanguage() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = useRouter();

  const [language, setLanguage] = useLocalStorage<Language>(
    "language",
    languages.find((item) => item.locale === locale) as Language
  );

  function onLanguageChange(language: Language) {
    router.push({ pathname, query }, asPath, { locale: language.locale });

    setLanguage(language);
  }

  return {
    language,
    onLanguageChange,
  };
}

function useLocalStorage<T>(key: string, currentValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === undefined) return currentValue;

    try {
      // Get from localStorage by key
      const itemKey = window.localStorage.getItem("key");

      // Parsed stored json or if none return value
      if (itemKey) return JSON.parse(itemKey);
      return currentValue;
    } catch (error) {
      // if error also return value
      console.log("ERROR", error);
      return currentValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return [storedValue, setValue] as const;
}
