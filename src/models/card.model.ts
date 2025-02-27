type NumberType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type IdType = `${NumberType}${NumberType}${NumberType}`;

export enum Type {
  DRAGON = "DRAGON",
  SPELLCASTER = "SPELLCASTER",
  BEAST_WARRIOR = "BEAST_WARRIOR",
  FIEND = "FIEND",
  PLANT = "PLANT",
  ZOMBIE = "ZOMBIE",
  DINOSAUR = "DINOSAUR",
  WARRIOR = "WARRIOR",
  WINGED_BEAST = "WINGED_BEAST",
  BEAST = "BEAST",
  ROCK = "ROCK",
  PYRO = "PYRO",
  THUNDER = "THUNDER",
  INSECT = "INSECT",
  REPTILE = "REPTILE",
  FISH = "FISH",
  AQUA = "AQUA",
  SEA_SERPENT = "SEA_SERPENT",
  FAIRY = "FAIRY",
  MACHINE = "MACHINE",
}

export enum GroupType {
  ANIMAL = "ANIMAL",
  AQUA = "AQUA",
  BEAST = "BEAST",
  DARK_SPELLCASTER = "DARK SPELLCASTER",
  DINOSAUR = "DINOSAUR",
  DRAGON = "DRAGON",
  EGG = "EGG",
  ELF = "ELF",
  FAIRY = "FAIRY",
  FEATHERED_A = "FEATHERED A",
  FEATHERED_B = "FEATHERED B",
  FEMALE = "FEMALE",
  FIEND = "FIEND",
  FIEND_SUMMON = "FIEND SUMMON",
  FISH = "FISH",
  HARPIE = "HARPIE",
  HARPIE_KILLER = "HARPIE KILLER",
  INSECT = "INSECT",
  JAR = "JAR",
  LIGHT = "LIGHT",
  MACHINE = "MACHINE",
  MIRROR = "MIRROR",
  NEPTUNE = "NEPTUNE",
  PLANT = "PLANT",
  PYRO = "PYRO",
  RAINBOW = "RAINBOW",
  REPTILE = "REPTILE",
  ROCK = "ROCK",
  SHADOW = "SHADOW",
  SPELLCASTER = "SPELLCASTER",
  THUNDER = "THUNDER",
  TURTLE = "TURTLE",
  WARRIOR = "WARRIOR",
  WINGED = "WINGED",
  WINGED_BEAST = "WINGED BEAST",
  ZOMBIE = "ZOMBIE",
}

export enum CardType {
  MONSTER = "MONSTER",
  EQUIP = "EQUIP",
  MAGIC = "MAGIC",
  FIELD = "FIELD",
  RITUAL = "RITUAL",
  TRAP = "TRAP",
}

export enum GuardianType {
  SUN = "SUN",
  MERCURY = "MERCURY",
  VENUS = "VENUS",
  MOON = "MOON",
  MARS = "MARS",
  JUPITER = "JUPITER",
  SATURN = "SATURN",
  URANUS = "URANUS",
  NEPTUNE = "NEPTUNE",
  PLUTO = "PLUTO",
}

/**
 * 0: target
 * 1: result
 */
export type FusionType = [CardBaseType["id"], CardBaseType["id"]];

export type CardBaseType = {
  /**
   * Card ID 001-999
   */
  id: IdType;

  /**
   * Card type (e.g., Monster, Equip, Magic)
   */
  cardType: CardType;

  /**
   * Group of the card
   */
  groups: GroupType[];

  /**
   * Name of the card
   */
  name: string;

  /**
   * Description of the card
   */
  description: string;

  /**
   * Icon image URLs of the card
   */
  icon: string;

  /**
   * Password to unlock the card
   */
  password?: string;

  /**
   * Star chip cost of the card
   */
  price?: number;

  /**
   * All possible fusions
   */
  fusions?: FusionType[];
};

export type CardMonsterType = CardBaseType & {
  /**
   * Type of the card (e.g., Dragon, Warrior, Spellcaster)
   */
  type: Type;

  /**
   * Level of the card
   */
  level: number;

  /**
   * Attack damage of the card
   */
  attack: number;

  /**
   * Defense of the card
   */
  defense: number;

  /**
   * Guardians of the card
   */
  guardians: [GuardianType, GuardianType];
};

export const MAX_HAND_CARDS = 5;
