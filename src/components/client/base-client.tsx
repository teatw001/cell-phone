import { Outlet } from 'react-router-dom';
import { HeaderClient } from './header-client';
import { FooterClient } from './footer-client';

export const BaseClient = () => {
    return (
        <>
            <HeaderClient />

            <Outlet />

            <FooterClient />
        </>
    )
}