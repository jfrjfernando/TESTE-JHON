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

export const GroupModel: yup.ObjectSchema<GroupType> = yup
  .object({
    id: yup.string().default(() => generateRandomID(64)),
    name: yup.string().required(),
    cards: yup.array().of(yup.string().required()).required(),
  })
  .required();
