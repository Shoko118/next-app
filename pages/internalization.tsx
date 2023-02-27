import { languages } from "@/datas/data";
import useLanguage from "@/hooks/useLanguage";
import { Language } from "@/ts/interfaces/interface";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default function Internalization(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const { t } = useTranslation("common");

  const { language, onLanguageChange } = useLanguage();

  function onHandleChange(locale: Language["locale"]) {
    const selectedLanguage = languages.find((item) => item.locale === locale);

    if (selectedLanguage) return onLanguageChange(selectedLanguage);
  }

  function onToggleLanguageClick(newLocale: string) {
    const { pathname, asPath, query } = router;

    router.push({ pathname, query }, asPath, { locale: newLocale });
  }

  function handleLocaleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { pathname, route } = router;

    const value = event.target.value;

    router.push(pathname, route, { locale: value });
  }
  return (
    <div>
      <h1>i18n-Next page</h1>

      <h2>Button Onclick</h2>
      {languages.map((lang, index) => (
        <div key={index}>
          <button onClick={() => onToggleLanguageClick(lang.locale)}>{lang.label}</button>
        </div>
      ))}

      <h2>Select Button</h2>
      <select onChange={handleLocaleChange} value={router.locale}>
        <option value="en">🇺🇸 English</option>
        <option value="de">German</option>
      </select>

      <h2>2 Select Button</h2>
      <select onChange={(e) => onHandleChange(e.target.value)} value={language.locale}>
        <option value="en">🇺🇸 English</option>
        <option value="de">German</option>
      </select>

      <h1>{t("h1")}</h1>
      <h1>{t("lang")} </h1>
    </div>
  );
}
