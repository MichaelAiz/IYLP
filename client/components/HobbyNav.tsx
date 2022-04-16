import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  ReceiptTaxIcon,
  ShieldExclamationIcon,
  XIcon,
  ClipboardListIcon,
  LibraryIcon,
  EyeIcon,
  UsersIcon
} from '@heroicons/react/outline';

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const navigation = [
  { id: 'Exchange', name: 'Exchange', href: '#exchange', icon: HomeIcon },
  { id: 'Tips', name: 'Tips', href: '#tips', icon: ShieldExclamationIcon },
  { id: 'Randome', name: 'randome', href: '#random', icon: ReceiptTaxIcon },
];


type DashboardNavProps = {
  activeNav: string;
  setActiveNav: (newActiveNav: string) => void;
  currentHobby: string
}

const HobbyNav = ({
  activeNav, setActiveNav,
}: DashboardNavProps) => {
  return (
    <>
      <div className="lg:flex lg:w-full h-full lg:flex-col">
        <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={classNames(
                    activeNav === item.id ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                  )}
                  aria-current={activeNav === item.id ? 'page' : undefined}
                  onClick={() => setActiveNav(item.id)}
                >
                  <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HobbyNav;
