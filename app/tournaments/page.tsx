'use client'
import React from 'react'
import Tournament from './layout.component'
import BaseLayout from '@/components/BaseLayout'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'react-quill/dist/quill.snow.css';

const TournamentPage = () => {
    return (
        <BaseLayout>
            <Tournament />
        </BaseLayout>
    )
}

export default TournamentPage
