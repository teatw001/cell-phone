import { Outlet } from 'react-router-dom';
import { HeaderAdmin } from './header-admin';
import { FooterAdmin } from './footer-admin';
import { SideBarAdmin } from './sidebar-admin';

export const BaseAdmin = () => {
    return (
        <>
            <SideBarAdmin header={<HeaderAdmin />} content={<Outlet />} footer={<FooterAdmin />} />
        </>
    )
}