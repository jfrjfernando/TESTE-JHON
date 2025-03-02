import { CardBaseType } from "@/models/card.model";
import { GroupType } from "@/models/group.model";
import { appendAssetsAPIPath } from "@/utils/path";
import * as pako from "pako";

export async function loadAllCards(): Promise<CardBaseType[]> {
  try {
    const response = await fetch(appendAssetsAPIPath("/data/app.json.gz"));

    if (!response.ok) {
      throw new Error("Connection failed!");
    }

    const data = await response.arrayBuffer();

    const decompressedData = pako.inflate(data, {
      to: "string",
    });

    const appData = JSON.parse(decompressedData);

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
      appendAssetsAPIPath("/data/groups_v1.json.gz")
    );

    if (!response.ok) {
      throw new Error("Connection failed!");
    }

    if (!response.ok) {
      throw new Error("Connection failed!");
    }

    const data = await response.arrayBuffer();

    const decompressedData = pako.inflate(data, {
      to: "string",
    });

    const appData = JSON.parse(decompressedData);

    // TODO: Use yup
    return appData as GroupType[];
  } catch (error) {
    console.error("Error loading groups data: ", error);
  }

  return [];
}
