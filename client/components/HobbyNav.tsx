import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
    SpeakerphoneIcon,
    SwitchHorizontalIcon
} from '@heroicons/react/outline';

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const navigation = [
  { id: 'Exchange', name: 'Exchange', href: '#exchange', icon: SpeakerphoneIcon},
  { id: 'Tips', name: 'Tips', href: '#tips', icon: SwitchHorizontalIcon }
];


type HobbyNavProps = {
  activeNav: string;
  setActiveNav: (newActiveNav: string) => void;
}

const HobbyNav = ({
  activeNav, setActiveNav,
}: HobbyNavProps) => {
  return (
    <>
      <div className=" hidden lg:flex lg:w-full h-full lg:flex-col">
        <div className="flex flex-col flex-grow bg-grey-50 pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 flex flex-col overflow-y-auto" aria-label="Sidebar">
            <div className="px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={classNames(
                    activeNav === item.id ? 'bg-active-nav text-IYLP-Violet border-l-IYLP-Violet border-l-2' : 'text-IYLP-Violet ',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium'
                  )}
                  onClick={() => setActiveNav(item.id)}
                >
                  <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-IYLP-Violet" aria-hidden="true" />
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
