import { Inngest, inngest } from './client';
import prisma from '@/lib/prisma';
import { NonRetriableError } from 'inngest'; // Added for safer error handling

// 1. syncUserCreation: Fix 'Event' casing, add defensive destructuring, fix typo/interpolation
export const syncUserCreation = inngest.createFunction(
    {id:'sync-user-create'},
    {event:'clerk/user.created'},
    async ({ event }) => { // ✅ FIX 1: Changed {Event} to { event }
        
        // ✅ FIX 2: Defensive destructuring (in case event is null/undefined)
        const { data: userData = {} } = event || {};

        // 🛑 Data validation to ensure we have required fields
        if (!userData.id || !userData.email_addresses?.[0]?.email_address) {
            throw new NonRetriableError("Clerk created event is missing required ID or primary email.");
        }

        await prisma.user.create({
            data:{
                id: userData.id,
                email: userData.email_addresses[0].email_address,
                // ✅ FIX 3: Use backticks for string interpolation, not single quotes
                name: `${userData.first_name} ${userData.last_name}`, 
                // ✅ FIX 4: Corrected typo from image_urs to image_url
                image: userData.image_url, 
            }
        })
    }
);

// 2. syncUserUpdation: Fix 'Event' casing and add defensive destructuring
export const syncUserUpdation = inngest.createFunction(
    {id:'sync-user-update'},
    {event:'clerk/user.updated'}, // NOTE: Clerk usually uses 'user.updated'
    async ({ event }) => { // ✅ FIX 1: Changed {Event} to { event }
        const { data: userData = {} } = event || {}; // ✅ FIX 2: Defensive destructuring

        if (!userData.id || !userData.email_addresses?.[0]?.email_address) {
            throw new NonRetriableError("Clerk updated event is missing required ID or primary email.");
        }

        await prisma.user.update({
            where: { id: userData.id, },
            data:{
                email: userData.email_addresses[0].email_address,
                // ✅ FIX 3: Use backticks
                name: `${userData.first_name} ${userData.last_name}`, 
                // ✅ FIX 4: Corrected typo
                image: userData.image_url, 
            }
        })
    }
);

// 3. syncUserDeletion: Fix 'Event' casing and add defensive destructuring
export const syncUserDeletion = inngest.createFunction(
    {id:'sync-user-delete'},
    {event:'clerk/user.deleted'},
    async ({ event }) => { // ✅ FIX 1: Changed {Event} to { event }
        const { data: userData = {} } = event || {}; // ✅ FIX 2: Defensive destructuring

        if (!userData.id) {
            throw new NonRetriableError("Clerk deleted event is missing required ID.");
        }

        await prisma.user.delete({
            where: { id: userData.id }
        })
    } 
);




/*
//Inngest function to save user data to database
export const syncUserCreation=inngest.createFunction(
    {id:'sync-user-create'},
    {event:'clerk/user.created'},
    async ({event})=>{
        const {data}=event
        await prisma.user.create({
            data:{
                id: data.id,
                email: data.email_addresses[0].email_address,
                name: '${data.first_name} ${data.last_name}',
                image: data.image_urs,
            }
        })

    }
)

//Inngest function to update user data in database
export const syncUserUpdation=inngest.createFunction(
    {id:'sync-user-update'},
    {event:'clerk/user.update'},
    async ({event})=>{
        const {data}=event
        await prisma.user.update({
            where: {id: data.id,},
            data:{
                email: data.email_addresses[0].email_address,
                name: '${data.first_name} ${data.last_name}',
                image: data.image_urs,
            }
        })

    }
)

export const syncUserDeletion=inngest.createFunction(
    {id:'sync-user-delete'},
    {event:'clerk/user.deleted'},
    async ({event})=>{
        const {data}=event
        await prisma.user.delete({
            where: {id: data.id,}
        })

    }   
)
*/