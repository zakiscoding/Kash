import { getUserAccounts } from '@/actions/dashboard.js'
import { defaultCategories } from '@/data/categories.js';
import React from 'react'
import AddTransactionForm from '../_components/transaction-form.jsx';
import { getTransaction } from '@/actions/transaction.js';

const AddTransactionPage = async ({ searchParams }) => {

  const accounts = await getUserAccounts();

  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className='max-w-3xl mx-auto px-5'>
      <h1 className='text-5xl gradient-title mb-8'>{editId? "Edit": "Add"} Transaction</h1>

      <AddTransactionForm
        accounts={accounts}
        categories= {defaultCategories}
        editMode= {!!editId}
        initialData={initialData}
        />
    </div>
  )
}

export default AddTransactionPage
