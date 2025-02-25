import * as yup from "yup";
import { generateRandomID } from "../utils/uid";

export type PoolType = {
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

export const PoolModel: yup.ObjectSchema<PoolType> = yup
  .object({
    id: yup.string().default(() => generateRandomID(64)),
    name: yup.string().required(),
    cards: yup.array().of(yup.string().required()).required(),
  })
  .required();
