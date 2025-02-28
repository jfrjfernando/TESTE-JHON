import * as yup from "yup";
import { generateRandomID } from "../utils/uid";

export type GroupType = {
  /**
   * ID of the pool
   */
  id: string;

  /**
   * Name of the pool
   */
  name: string;

  /**
   * Cards in the pool
   */
  cards: string[];
};

export type GroupSelectedModel = yup.InferType<typeof GroupSelectedModel>;

export const GroupModel: yup.ObjectSchema<GroupType> = yup
  .object({
    id: yup.string().default(() => generateRandomID(64)),
    name: yup.string().required(),
    cards: yup.array().of(yup.string().required()).required(),
  })
  .required();

export const GroupSelectedModel: yup.ObjectSchema<{
  id: GroupType["id"];
  timestamp?: number;
}> = yup
  .object({
    id: yup.string().default(() => generateRandomID(64)),
    timestamp: yup.number().default(() => Date.now()),
  })
  .required();
