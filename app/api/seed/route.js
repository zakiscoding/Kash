import { seedTransactions } from "@/actions/seed.js"

export async function GET(){
    const result = await seedTransactions()
    return Response.json(result);
    
}