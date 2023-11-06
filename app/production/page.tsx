'use client'
import BaseLayout from '@/components/BaseLayout'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Tournaments from './layout.component'

const Production = () => {
    const queryClient = new QueryClient()
    return (
        <BaseLayout>
            <QueryClientProvider client={queryClient}>
                <Tournaments />
            </QueryClientProvider>
        </BaseLayout>
    )
}

export default Production
