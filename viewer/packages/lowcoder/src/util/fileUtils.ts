import { Buffer } from "buffer";
import mime from "mime";
import { saveAs } from "file-saver";
import { isArray, isObject } from "lodash";

interface SaveDataAsFileParams {
  data: any;
  filename: string;
  fileType: "empty" | "txt" | "json" | "csv" | "xlsx" | string;
  dataType?: "url" | "base64";
  delimiter?: string;
}

export async function saveDataAsFile({ data, filename, fileType, dataType, delimiter }: SaveDataAsFileParams) {
  if (dataType === "url") {
    return saveAs(data, filename, { autoBom: true });
  }

  let finalFileType = fileType;
  if (finalFileType === "empty" || !mime.getType(finalFileType)) {
    const arr = filename.split(".");
    finalFileType = arr[arr.length - 1];
  }
  finalFileType = finalFileType ?? "txt";
  const mim = mime.getType(finalFileType);

  if (dataType === "base64") {
    const blob = new Blob([Buffer.from(data, "base64")], {
      type: mim + ";charset=utf-16",
    });
    return saveAs(blob, filename, { autoBom: true });
  }

  let blobData = data;

  switch (finalFileType) {
    case "txt":
    case "json":
      blobData = isObject(data) ? JSON.stringify(data) : data;
      break;
    case "csv":
    case "xlsx":
      let wb;
      const XLSX = await import("xlsx");
      if (isArray(data)) {
        const ws = XLSX.utils.json_to_sheet(data);
        // ws["!cols"] = [{width: xx}];
        wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, filename);
      } else {
        wb = XLSX.read(data, { type: "string" });
      }
      let writeOptions: any = {
        bookType: finalFileType,
        bookSST: false, // whether to generate Shared String Table? setting true will slow down the generating speed, but more compatible for lower versioned iOS devices
        type: "buffer",
      }
      if (finalFileType === 'csv' && delimiter) {
        writeOptions['FS'] = delimiter;
      }
      blobData = XLSX.write(wb, writeOptions);
      break;
  }
  const blob = new Blob([blobData], {
    type: mim + ";charset=utf-16",
  });
  saveAs(blob, filename, { autoBom: true });
}
