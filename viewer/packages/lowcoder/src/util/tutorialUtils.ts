import { trans } from "i18n";

export const QueryTutorials = {
  js: trans("queryTutorial.js"),
  transformer: trans("queryTutorial.transformer"),
  tempState: trans("queryTutorial.tempState"),
  dataResponder: trans("queryTutorial.dataResponder"),
  es: "https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html",
  redis: "https://redis.io/commands/",
  googleSheets: {
    readData: "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get",
    appendData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append",
    updateData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update",
    deleteData: undefined,
    clearData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/clear",
  },
} as const;
