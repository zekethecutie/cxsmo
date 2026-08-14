import { z } from "zod";
import { createCxsmoMediaAsset, listCxsmoContentEntries, listCxsmoMediaAssets, upsertCxsmoContentEntry } from "../db";
import { storagePut } from "../storage";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";

const imageMimeTypes = ["image/png", "image/jpeg", "image/webp"] as const;
const contentEntryInput = z.object({
  contentKey: z.string().trim().min(2).max(120).regex(/^[a-z0-9._-]+$/),
  payload: z.string().min(2).max(24000),
  status: z.enum(["draft", "published"]),
});

export const cxsmoStudioRouter = router({
  content: router({
    publicList: publicProcedure.query(() => listCxsmoContentEntries("published")),
    list: adminProcedure.query(() => listCxsmoContentEntries()),
    save: adminProcedure.input(contentEntryInput).mutation(async ({ ctx, input }) => {
      await upsertCxsmoContentEntry({ ...input, updatedByUserId: ctx.user.id });
      return { success: true } as const;
    }),
  }),
  media: router({
    list: adminProcedure.query(() => listCxsmoMediaAssets()),
    upload: adminProcedure.input(z.object({
      fileName: z.string().trim().min(1).max(140),
      alt: z.string().trim().min(4).max(280),
      mimeType: z.enum(imageMimeTypes),
      dataBase64: z.string().min(20).max(7_000_000),
    })).mutation(async ({ ctx, input }) => {
      const bytes = Buffer.from(input.dataBase64, "base64");
      if (!bytes.length || bytes.length > 5_000_000) throw new Error("Images must be between 1 byte and 5 MB.");
      const cleanName = input.fileName.replace(/[^a-z0-9._-]/gi, "-").toLowerCase();
      const uploaded = await storagePut(`cxsmo-studio/${ctx.user.id}/${cleanName}`, bytes, input.mimeType);
      await createCxsmoMediaAsset({ name: input.fileName, alt: input.alt, url: uploaded.url, storageKey: uploaded.key, mimeType: input.mimeType, createdByUserId: ctx.user.id });
      return { ...uploaded, name: input.fileName, alt: input.alt, mimeType: input.mimeType };
    }),
  }),
});
