// lang.js - Global Dual Language Controller (EN / BM)
let currentLang = localStorage.getItem("site_lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("site_lang", lang);
  document.documentElement.lang = lang;

  // Update all elements with language attributes
  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === "INPUT" && el.type === "text") {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Update switcher button UI
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.innerHTML =
      lang === "en" ? "<span>🇲🇾 BM</span>" : "<span>🇬🇧 EN</span>";
  }

  // Trigger quiz re-render if present
  if (typeof onLanguageChange === "function") {
    onLanguageChange(lang);
  }
}

function toggleLanguage() {
  setLanguage(currentLang === "en" ? "bm" : "en");
}

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});
