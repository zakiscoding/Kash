import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client.js";
import { checkBudgetAlert, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "@/lib/inngest/functions.js";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlert,
    triggerRecurringTransactions,
    processRecurringTransaction,
    generateMonthlyReports,
  ],
});
