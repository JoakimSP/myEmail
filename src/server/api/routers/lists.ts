import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const listsRouter = createTRPCRouter({
    update: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1) || z.undefined(),
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.list.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name,
                },
            });
        }),

    create: publicProcedure
        .input(z.object({
            name: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.list.create({
                data: {
                    name: input.name,
                },
            });
        }),

    readAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.list.findMany({
            orderBy: { createdAt: "asc" },
            include: { contacts: true }
        });
    }),

    getById: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {

            return ctx.db.list.findUnique({
                where: {
                    id: input.valueOf()
                },
                include: {
                    contacts: true
                }
            });
        }),

    delete: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            return ctx.db.list.delete({
                where: {
                    id: input.valueOf()
                }
            });
        }),
});
