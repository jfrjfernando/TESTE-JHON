import {
  CardMonsterType,
  CardType,
  GroupType as CardGroupType,
  GuardianType,
  Type,
} from "../card.model";
import { GroupType } from "../group.model";
import ALL_CARDS from "./cards";

export const DEFAULT_GROUPS: GroupType[] = [
  ...createGroupGroups(),
  ...createTypeGroup(),
  ...createCardTypeGroup(),
  ...createGuardianTypeGroup(),
  createHighestFusionGroup(),
  createWeaknessGroup(),
  createStrongestGroup(),
  createDefensiveGroup(),
  createPasswordLessGroup(),
];

/**
 * Create default groups using the given groups.
 *
 * @param groups
 * @returns groups
 */
function createGroupGroups(): GroupType[] {
  return Object.values(CardGroupType)
    .map((group) => ({
      id: `default-pool-group-${fixLabel(group.toLowerCase())}`,
      name: group + " Group",
      cards: ALL_CARDS.filter((card) => card.groups.includes(group)).map(
        (each) => each.id
      ),
    }))
    .filter((each) => each.cards.length > 0);
}

function createTypeGroup(): GroupType[] {
  return Object.values(Type)
    .map((type) => ({
      id: `default-pool-card-group-${fixLabel(type.toLowerCase())}`,
      name: type,
      cards: ALL_CARDS.filter(
        (card) => (card as CardMonsterType)?.type === type
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createCardTypeGroup(): GroupType[] {
  return Object.values(CardType)
    .map((cardType) => ({
      id: `default-pool-type-${fixLabel(cardType.toLowerCase())}`,
      name: cardType,
      cards: ALL_CARDS.filter(
        (card) => (card as CardMonsterType).cardType === cardType
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createGuardianTypeGroup(): GroupType[] {
  return Object.values(GuardianType)
    .map((type) => ({
      id: `default-pool-guardian-${fixLabel(type.toLowerCase())}`,
      name: type,
      cards: ALL_CARDS.filter((card) =>
        (card as CardMonsterType)?.guardians?.includes(type)
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createHighestFusionGroup(): GroupType {
  return {
    id: `default-pool-highest-fusion`,
    name: "Highest Fusion",
    cards: ALL_CARDS.filter((each) => !!each.fusions)
      .sort((a, b) => b.fusions!.length - a.fusions!.length)
      .slice(0, 30)
      .map((each) => each.id),
  };
}

function createWeaknessGroup(): GroupType {
  return {
    id: `default-pool-weakness`,
    name: "Weakness",
    cards: ALL_CARDS.filter((card) => card.cardType === CardType.MONSTER)
      .sort(
        (a, b) =>
          (a as CardMonsterType).attack +
          (a as CardMonsterType).defense -
          (b as CardMonsterType).attack -
          (b as CardMonsterType).defense
      )
      .slice(0, 30)
      .map((each) => each.id),
  };
}

// Now do the same but this time with the strongest cards
function createStrongestGroup(): GroupType {
  return {
    id: `default-pool-strongest`,
    name: "Strongest",
    cards: ALL_CARDS.filter((card) => card.cardType === CardType.MONSTER)
      .sort(
        (a, b) =>
          (b as CardMonsterType).attack +
          (b as CardMonsterType).defense -
          (a as CardMonsterType).attack -
          (a as CardMonsterType).defense
      )
      .slice(0, 30)
      .map((each) => each.id),
  };
}

function createDefensiveGroup(): GroupType {
  return {
    id: `default-pool-defensive`,
    name: "Defensive",
    cards: ALL_CARDS.filter((card) => card.cardType === CardType.MONSTER)
      .sort(
        (a, b) =>
          (b as CardMonsterType).defense - (a as CardMonsterType).defense
      )
      .slice(0, 30)
      .map((each) => each.id),
  };
}

function createPasswordLessGroup(): GroupType {
  return {
    id: `default-pool-passwordless`,
    name: "Passwordless",
    cards: ALL_CARDS.filter((card) => !card.password).map((each) => each.id),
  };
}

function fixLabel(label: string) {
  return label.replace(" ", "");
}
