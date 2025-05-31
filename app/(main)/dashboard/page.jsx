import React, { Suspense } from 'react'
import CreateAccountDrawer from '../../../components/create-account-drawer.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Plus } from 'lucide-react';
import { getDashboardData, getUserAccounts } from '@/actions/dashboard.js';
import AccountCard from './_components/account-card.jsx';
import { getCurrentBudget } from '@/actions/budget.js';
import BudgetProgress from './_components/budget-progress.jsx';
import DashboardOverview from './_components/transactions-overview.jsx';

async function DashboardPage()  {
    const accounts = await getUserAccounts()

    const defaultAccount = accounts?.find((account) => account.isDefault);

    let budgetData = null;
    if (defaultAccount) {
        budgetData = await getCurrentBudget(defaultAccount.id);
    }

    const transactions = await getDashboardData();

    return (
        <div className='space-y-8'>
            
            {/*BudgetProgress*/}
            {defaultAccount && (
                <BudgetProgress
                    initialBudget={budgetData?.budget}
                    currentExpenses={budgetData?.currentExpenses || 0}
                />

            )}

            {/* Overview */}
            <Suspense fallback={"Loading Overview..."}>
                <DashboardOverview
                    accounts={accounts}
                    transactions={transactions || []}
                
                />
            </Suspense>

            {/* Accounts Grid */}
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <CreateAccountDrawer>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                        <CardContent className="flex flex-col items-center justify-center 
                        text-muted-foreground h-full pt-5">
                            <Plus className='h-10 w-10 mb-2'/>
                            <p className='text-sm font-medium'>Add New Account</p>
                        </CardContent>
                    </Card>
                </CreateAccountDrawer>

                {accounts.length > 0 &&
                    accounts?.map((account)=> {
                    return <AccountCard key={account.id} account={account}/>;
                })}
            </div>
            </div>
            );
        }

    export default DashboardPage;