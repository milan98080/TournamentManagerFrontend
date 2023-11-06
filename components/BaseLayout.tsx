'use client'
import Sidebar from "@/components/Sidebar";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
interface BaseLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}
const queryClient = new QueryClient()
export default function BaseLayout({ children }: BaseLayoutProps) {
    return (
        <div className="layout">
            <QueryClientProvider client={queryClient}>
            <Sidebar/>
            {children}
            </QueryClientProvider>
        </div>
        );
}