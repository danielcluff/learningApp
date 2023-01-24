import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";
// import { In } from "typeorm";

// keys is array [{postId: 1, userId: 5},{postId: 4, userId: 3}]
// return {postId: 1, userId: 5, value: 1}
export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      // const updoots = await Updoot.findBy({ id: In(keys) });
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
