import { useState } from "react";
import { Language } from "./api/api";
import { LanguageContext } from "./context/LanguageContext";
import Router from "./Router";

function App() {
  const [language, setLanguage] = useState(Language.ko);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Router />
    </LanguageContext.Provider>
  );
}

export default App;
