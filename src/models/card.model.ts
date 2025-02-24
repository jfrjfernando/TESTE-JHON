type NumberType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type IdType = `${NumberType}${NumberType}${NumberType}`;

export enum Type {
  DRAGON = "Dragon",
  SPELLCASTER = "Spellcaster",
  BEAST_WARRIOR = "Beast_Warrior",
  FIEND = "Fiend",
  PLANT = "Plant",
  ZOMBIE = "Zombie",
  DINOSAUR = "Dinosaur",
  WARRIOR = "Warrior",
  WINGED_BEAST = "Winged_Beast",
  BEAST = "Beast",
  ROCK = "Rock",
  PYRO = "Pyro",
  THUNDER = "Thunder",
  INSECT = "Insect",
  REPTILE = "Reptile",
  FISH = "Fish",
  AQUA = "Aqua",
  SEA_SERPENT = "Sea_Serpent",
  FAIRY = "Fairy",
  MACHINE = "Machine",
}

export enum GroupType {
  ANIMAL = "Animal",
  AQUA = "Aqua",
  BEAST = "Beast",
  DARK_SPELLCASTER = "Dark Spellcaster",
  DINOSAUR = "Dinosaur",
  DRAGON = "Dragon",
  EGG = "Egg",
  ELF = "Elf",
  FAIRY = "Fairy",
  FEATHERED_A = "Feathered A",
  FEATHERED_B = "Feathered B",
  FEMALE = "Female",
  FIEND = "Fiend",
  FIEND_SUMMON = "Fiend Summon",
  FISH = "Fish",
  HARPIE = "Harpie",
  HARPIE_KILLER = "Harpie Killer",
  INSECT = "Insect",
  JAR = "Jar",
  LIGHT = "Light",
  MACHINE = "Machine",
  MIRROR = "Mirror",
  NEPTUNE = "Neptune",
  PLANT = "Plant",
  PYRO = "Pyro",
  RAINBOW = "Rainbow",
  REPTILE = "Reptile",
  ROCK = "Rock",
  SHADOW = "Shadow",
  SPELLCASTER = "Spellcaster",
  THUNDER = "Thunder",
  TURTLE = "Turtle",
  WARRIOR = "Warrior",
  WINGED = "Winged",
  WINGED_BEAST = "Winged Beast",
  ZOMBIE = "Zombie",
}

export enum CardType {
  MONSTER = "Monster",
  EQUIP = "Equip",
  MAGIC = "Magic",
  FIELD = "Field",
  RITUAL = "Ritual",
  TRAP = "Trap",
}

export enum GuardianType {
  SUN = "Sun",
  MERCURY = "Mercury",
  VENUS = "Venus",
  MOON = "Moon",
  MARS = "Mars",
  JUPITER = "Jupiter",
  SATURN = "Saturn",
  URANUS = "Uranus",
  NEPTUNE = "Neptune",
  PLUTO = "Pluto",
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
