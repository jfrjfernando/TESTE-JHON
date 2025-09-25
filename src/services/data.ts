import { CardBaseType } from "@/models/card.model";
import { GroupType } from "@/models/group.model";
import { appendAssetsAPIPath } from "@/utils/path";
import pako from "pako";

const APP_JSON_FILENAME = "app_v1.json.gz";
const GROUPS_JSON_FILENAME = "groups_v1.json.gz";

export async function loadAllCards(): Promise<CardBaseType[]> {
  try {
    const response = await fetch(
      appendAssetsAPIPath(`/data/${APP_JSON_FILENAME}`)
    );

    if (!response.ok) {
      throw new Error("Connection failed!");
    }

    let appData;

    if (import.meta.env.DEV) {
      appData = await response.json();
    } else {
      const data = await response.arrayBuffer();

      const decompressedData = pako.inflate(data, {
        to: "string",
      });

      appData = JSON.parse(decompressedData);
    }

    // TODO: Use yup
    return appData as CardBaseType[];
  } catch (error) {
    console.error("Error loading app data: ", error);
  }

  return [];
}

export async function loadAllGroups(): Promise<GroupType[]> {
  try {
    const response = await fetch(
      appendAssetsAPIPath(`/data/${GROUPS_JSON_FILENAME}`)
    );

    if (!response.ok) {
      throw new Error("Connection failed!");
    }

    let appData;

    if (import.meta.env.DEV) {
      appData = await response.json();
    } else {
      const data = await response.arrayBuffer();

      const decompressedData = pako.inflate(data, {
        to: "string",
      });

      appData = JSON.parse(decompressedData);
    }

    // TODO: Use yup
    return appData as GroupType[];
  } catch (error) {
    console.error("Error loading groups data: ", error);
  }

  return [];
}
