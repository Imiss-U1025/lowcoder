import { getI18nObjects, Translator } from "lowcoder-core";
import * as localeData from "./locales";
import { I18nObjects } from "./locales/types";
import { ReactNode } from "react";

type transType = (key: any, variables?: any) => string;
type transToNodeType = (key: any, variables?: any) => ReactNode;

let trans: transType;
let transToNode: transToNodeType;
let language = 'en';

export const initTranslator = (lang?: string) => {
  const translator =  new Translator<typeof localeData.en>(
    localeData,
    REACT_APP_LANGUAGES,
    ['en']
  );

  language = translator.language;
  transToNode = translator.transToNode;
  trans = translator.trans;
}

export const i18nObjs = getI18nObjects<I18nObjects>(localeData, REACT_APP_LANGUAGES);

initTranslator();

export { language, trans, transToNode };
