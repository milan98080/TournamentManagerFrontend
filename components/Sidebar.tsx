'use client'
import Image from "next/image";
import Link from "next/link";
import { TbTournament } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { PiTelevisionDuotone } from "react-icons/pi";
import { FaRankingStar } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { useActivePath } from './helper'

const sidebarItems = [
    {
        name: 'Home',
        icon: AiFillHome,
        href: '/'
    },
    {
        name: 'Tournaments',
        icon: TbTournament,
        href: '/tournaments'
    },
    {
        name: 'Production',
        icon: PiTelevisionDuotone,
        href: '/production'
    },
    {
        name: 'Standings',
        icon: FaRankingStar,
        href: '/standings'
    }
]

export default function Sidebar() {
    const isActivePath = useActivePath()
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false)

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar((prev) => !prev)
    }

    return (
        <div className="sidebar__wrapper">
            <button title="button" type="submit" className="sidebar__btn" onClick={toggleSidebarCollapseHandler}>
                {isCollapsedSidebar ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsedSidebar}>
                <div className="sidebar__top">
                    <Image
                        src={'/logo.png'}
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">Tournament Dashboard</p>
                </div>
                <ul className="sidebar__list">
                    {sidebarItems.map((item, index) => (
                        <li className="sidebar__item" key={index}>
                            <Link href={item.href} className={`${isActivePath(item.href) ? 'active' : ''} sidebar__link`}>
                                <span className="sidebar_icon">
                                    <item.icon />
                                </span>
                                <span className="sidebar__name">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    )
}