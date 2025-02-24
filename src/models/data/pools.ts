import {
  CardMonsterType,
  CardType,
  GroupType,
  GuardianType,
  Type,
} from "../card.model";
import { PoolType } from "../pool.model";
import ALL_CARDS from "./cards";

export const DEFAULT_POOLS: PoolType[] = [
  ...createGroupPools(),
  ...createTypePools(),
  ...createCardTypePools(),
  ...createGuardianTypePools(),
  createHighestFusionPool(),
  createWeaknessPool(),
  createStrongestPool(),
  createDefensivePool(),
  createPasswordLessPool(),
];

/**
 * Create default pools using the given groups.
 *
 * @param groups
 * @returns pools
 */
function createGroupPools(): PoolType[] {
  return Object.values(GroupType)
    .map((group) => ({
      id: `default-pool-${group.toLowerCase()}`,
      name: group,
      cards: ALL_CARDS.filter((card) => card.groups.includes(group)).map(
        (each) => each.id
      ),
    }))
    .filter((each) => each.cards.length > 0);
}

function createTypePools(): PoolType[] {
  return Object.values(Type)
    .map((type) => ({
      id: `default-pool-${type.toLowerCase()}`,
      name: type,
      cards: ALL_CARDS.filter(
        (card) => (card as CardMonsterType).type === type
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createCardTypePools(): PoolType[] {
  return Object.values(CardType)
    .map((cardType) => ({
      id: `default-pool-${cardType.toLowerCase()}`,
      name: cardType,
      cards: ALL_CARDS.filter(
        (card) => (card as CardMonsterType).cardType === cardType
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createGuardianTypePools(): PoolType[] {
  return Object.values(GuardianType)
    .map((type) => ({
      id: `default-pool-${type.toLowerCase()}`,
      name: type,
      cards: ALL_CARDS.filter((card) =>
        (card as CardMonsterType).guardians.includes(type)
      ).map((each) => each.id),
    }))
    .filter((each) => each.cards.length > 0);
}

function createHighestFusionPool(): PoolType {
  return {
    id: `default-pool-highest-fusion`,
    name: "Highest Fusion",
    cards: ALL_CARDS.sort((a, b) => b.fusions!.length - a.fusions!.length)
      .slice(0, 30)
      .map((each) => each.id),
  };
}

function createWeaknessPool(): PoolType {
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
function createStrongestPool(): PoolType {
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

function createDefensivePool(): PoolType {
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

function createPasswordLessPool(): PoolType {
  return {
    id: `default-pool-passwordless`,
    name: "Passwordless",
    cards: ALL_CARDS.filter((card) => !card.password).map((each) => each.id),
  };
}
