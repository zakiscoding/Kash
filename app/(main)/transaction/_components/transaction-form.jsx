"use client";

import { createTransaction, updateTransaction } from '@/actions/transaction.js'
import { transactionSchema } from '@/app/lib/schema.js'
import CreateAccountDrawer from '@/components/create-account-drawer.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import useFetch from '@/hooks/use-fetch.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Receipt } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation.js'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ReceiptScanner from './receipt-scanner.jsx'


const AddTransactionForm = ( {
    accounts,
    categories,
    editMode = false,
    initialData = null,
} ) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");

    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors},
        watch,
        getValues,
        reset,
    } = useForm({
        resolver:zodResolver(transactionSchema),
            defaultValues: 
                editMode && initialData
                ?{
                    type: initialData.type,
                    amount: initialData.amount.toString(),
                    description: initialData.description,
                    accountId: initialData.accountId,
                    category: initialData.category,
                    date: new Date(initialData.date),
                    isRecurring: initialData.isRecurring,
                    ...(initialData.recurringInterval && {
                        recurringInterval: initialData.recurringInterval,
                    }),
                } 
            :   {
                type: "EXPENSE",
                amount: "",
                description: "",
                accountId: accounts.find((ac) => ac.isDefault)?.id,
                date: new Date(),
                isRecurring: false,
            }
    })

    const {
        loading: transactionLoading,
        fn: transactionFn,
        data: transactionResult,
    } = useFetch(editMode ? updateTransaction : createTransaction);
    
    const type = watch("type");
    const isRecurring = watch("isRecurring");
    const date = watch("date");
   
    const onSubmit = async (data) => {
        const formData = {
            ...data,
            amount: parseFloat(data.amount),
        };

        if (editMode) {
            transactionFn(editId, formData);
        } else {
        transactionFn(formData);
        }
    };

    useEffect(() => {
        if (transactionResult?.success && !transactionLoading) {
            toast.success(
                editMode 
                    ? "Transaction updated successfully" 
                    : "Transaction created successfully"
            );
            reset();
            router.push(`/account/${transactionResult.data.accountId}`);
        }
    }, [transactionResult, transactionLoading, editMode])

    const filteredCategories = categories.filter(
        (category) => category.type === type
    );

    const handleScanComplete = (scannedData) => {
        if (scannedData){
            setValue("amount", scannedData.amount.toString());
            setValue("date", new Date(scannedData.date));
            if (scannedData.description) {
                setValue("description", scannedData.description);
            }
            if (scannedData.category) {
                setValue("category", scannedData.category);
            }
        }
    };

    return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {/* Ai Reciept Scanner */}

        {!editMode && <ReceiptScanner onScanComplete={handleScanComplete}/>}
        
        <div className='space-y-2'>
            <label className='text-sm font-medium'>Type</label>
            <Select
                onValueChange={(value) => setValue("type", value) }
                defaultValue={type}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="EXPENSE">Expense</SelectItem>
                <SelectItem value="INCOME">Income</SelectItem>
            </SelectContent>
            </Select>

            {errors.type && (
                <p className='text-red-500 text-sm'>{errors.type.message}</p>
            )}
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Amount</label>
                <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("amount")}
                />

                {errors.amount && (
                    <p className='text-red-500 text-sm'>{errors.amount.message}</p>
                )}
            </div>
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Account</label>
                <Select
                    onValueChange={(value) => setValue("accountId", value) }
                    defaultValue={getValues("accountId")}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                    {accounts.map((account)=> (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name} (${parseFloat(account.balance).toFixed(2)})
                        </SelectItem>
                        
                ))}
                    <CreateAccountDrawer>
                        <Button 
                            variant="ghost" 
                            className="w-full select-none items-center text-sm outline-none"
                            >
                            Create Account
                        </Button>
                    </CreateAccountDrawer>
                </SelectContent>
                </Select>

                {errors.accountId && (
                    <p className='text-red-500 text-sm'>{errors.accountId.message}</p>
                )}
            </div>
        </div>
        <div className='space-y-2'>
            <label className='text-sm font-medium'>Category</label>
            <Select
                onValueChange={(value) => setValue("category", value) }
                defaultValue={getValues("category")}
            >
            <SelectTrigger>
                <SelectValue
                    className='hover:bg-neutral-200'
                    placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
                {filteredCategories.map((category)=> (
                    <SelectItem key={category.id} value={category.id}>
                        {category.name}
                    </SelectItem>
                    
                ))}
            </SelectContent>
            </Select>

            {errors.category && (
                <p className='text-red-500 text-sm'>{errors.category.message}</p>
            )}
         </div>
         <div className='space-y-2'>
            <label className='text-sm font-medium'>Date</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                        variant="outline"
                        className="bg-neutral w-full pl-3 text-left font-normal">
                        {date ? format(date,"PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar 
                    mode="single" 
                    selected= {date}
                    onSelect={(date) => setValue("date",date)}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    />
                </PopoverContent>
            </Popover>


            {errors.date && (
                <p className='text-red-500 text-sm'>{errors.date.message}</p>
            )}
         </div>
         <div className='space-y-2'>
            <label className='text-sm font-medium'>Description</label>
            <Input
                placeholder="Enter description"
                {...register("description")}
            />

            {errors.description && (
                <p className='text-red-500 text-sm'>{errors.description.message}</p>
            )}

         </div>       
        <div className='flex items-center justify-between rounded-lg border p-3'>
            <div className= "space-y-0.5">
                <label 
                htmlFor="balance" 
                className='text-sm font-medium cursor-pointer'
                >
                    Recurring Transaction
                </label>
                <p className='text-sm text-gray-500 foreground'>
                    If this is a recurring transaction, enable this option and select the interval.
                </p>
            </div>
            <Switch 
                checked={isRecurring}
                onCheckedChange={(checked => setValue("isRecurring", checked))}
            />
        </div>

        {isRecurring && (
        <div className='space-y-2'>
            <label className='text-sm font-medium'>Recurring Interval</label>
            <Select
                onValueChange={(value) => setValue("recurringInterval", value) }
                defaultValue={getValues("recurringInterval")}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select Interval" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
            </SelectContent>
            </Select>

            {errors.recurringInterval && (
                <p className='text-red-500 text-sm'>
                    {errors.recurringInterval.message}
                </p>
            )}
        </div>
        )}

        <div className='flex gap-4'>
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                className="w-full"
                disabled={transactionLoading}
            >
                {transactionLoading ? (
                    <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                        {editMode ? "Updating..." : "Creating..."}
                    </>

                )   :   editMode ? (
                    "Update Transaction"
                )   :   (
                    "Create Transaction"
                )}
            </Button>
        </div>
    </form>
    
)}

export default AddTransactionForm