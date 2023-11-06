'use client'
import BaseLayout from '@/components/BaseLayout'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import TournamentProd from './layout.component'

const Production = () => {
    const queryClient = new QueryClient()
    return (
        <BaseLayout>
            <QueryClientProvider client={queryClient}>
                <TournamentProd />
            </QueryClientProvider>
        </BaseLayout>
    )
}

export default Production
