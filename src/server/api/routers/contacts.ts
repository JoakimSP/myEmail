import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contactsRouter = createTRPCRouter({
    update: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1) || z.undefined(),
            email: z.string().email({ message: "Invalid email address" }),
            address: z.string() || z.undefined(),
            phoneNumber: z.number() || z.undefined()
        }))
        .mutation(async ({ ctx, input }) => {
            
            return ctx.db.contacts.update({
                where: {
                    id: input.id
                },
                data: {
                    email: input.email,
                    name: input.name,
                    address: input.address,
                    phoneNumber: input.phoneNumber
                },
            });
        }),

    create: publicProcedure
        .input(z.object({
            name: z.string().min(1),
            email: z.string().email({ message: "Invalid email address" }),
            address: z.string() || z.null(),
            phoneNumber: z.number() || z.null(),
            emailList: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.contacts.create({
                data: {
                    email: input.email,
                    name: input.name,
                    address: input.address,
                    phoneNumber: input.phoneNumber,
                    emailList : {
                        connect : {
                            id : input.emailList
                        }
                    }
                },
            });
        }),
        createMany: publicProcedure
        .input(z.array(z.object({
            name: z.string().min(1),
            email: z.string().email({ message: "Invalid email address" }),
            address: z.string().optional(),
            phoneNumber: z.number().optional(),
            emailList: z.string()
        })))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.contacts.createMany({
                data: input.map(item => ({
                    email: item.email,
                    name: item.name,
                    address: item.address,
                    phoneNumber: item.phoneNumber,
                    emailListId: item.emailList
                })),
                skipDuplicates: true
            });
        }),

    read: publicProcedure.query(({ ctx }) => {
        return ctx.db.contacts.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),

    delete: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {

            return ctx.db.contacts.delete({
                where: {
                    id: input.valueOf()
                }
            });
        }),
});
