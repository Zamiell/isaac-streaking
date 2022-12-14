import type { UserStreak } from "@prisma/client";
import type { Goal } from "src/enums/Goal";
import type { PlayerType } from "src/enums/PlayerType";
import { db } from "./database";

export function getLeaderboard(
  character: PlayerType,
  goal: Goal,
): Promise<UserStreak[]> {
  const user = db.userStreak.findMany({
    where: {
      character,
      goal,
    },
    orderBy: {
      streakNumBest: "desc",
    },
    take: 100,
  });

  return user;
}
