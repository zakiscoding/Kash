"use client";

import { updateDefaultAccount } from '@/actions/accounts.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import useFetch from '@/hooks/use-fetch.js';
import { ArrowDownRight, ArrowUpRight} from 'lucide-react';
import Link from 'next/link.js';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const AccountCard = ({ account }) => {
    const {name,type,balance,id,isDefault} = account;
    
    const {
        loading: updateDefaultLoading,
        fn: updateDefaultFn,
        data: updatedAccount,
        error,
    } = useFetch(updateDefaultAccount);

    const handleDefaultChange = async (event) =>{
        event.preventDefault();
    
        if (isDefault) {
            toast.warning("You need atleast 1 default account");
            return; //Doesnt allow toggling if there isnt another replacing it
        }
        
        await updateDefaultFn(id);
    };

    useEffect(() => {
        if (updatedAccount?.success){
            toast.success("Default account updated succesfully")
        }
    },[updatedAccount, updateDefaultLoading]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "Failed to update default account")
        }
    },[error]);

  return (
    <Card className='hover:shadow-md transition-shadow group relative'>
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
            <Switch 
            checked={isDefault} 
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}/>
        </CardHeader>
        <CardContent>
            <div className='text-3xl font-bold'>
                ${parseFloat(balance).toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div className='flex items-center'>
                <ArrowUpRight className="me-1 h-4 w-4 text-green-500"/>
                Income
            </div>
            <div className='flex items-center'>
                <ArrowDownRight className='mr-1 h-4 w-4 text-red-500'/>
                Expense
            </div>
        </CardFooter>
       </Link>
    </Card>

  )
}

export default AccountCard
