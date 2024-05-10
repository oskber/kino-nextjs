'use client';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import ProfilePageButton from './ProfileCtaButton';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';

export default function ProfilePage() {
  const [showBonusElement, setShowBonus] = useState(false);
  const [showSettingsElement, setShowSettingElement] = useState(false);
  function showBonus() {
    if (showBonusElement === false) {
      setShowBonus(true);
    } else {
      setShowBonus(false);
    }
  }
  function showSettings() {
    if (showSettingsElement === false) {
      setShowSettingElement(true);
    } else {
      setShowSettingElement(false);
    }
  }
  return (
    <section className='text-white w-full border-t-2 border-custom_yellow mt-10 mb-10'>
      <div className='flex justify-center mt-10'>
        <TrophyIcon className='h-20 w-20  text-yellow-500 ' />
      </div>
      <div className='flex justify-center'>
        <strong> Du är guldmedlem!</strong>
      </div>
      <nav className='flex justify-evenly mr-2 ml-2 mt-10 sm:justify-center sm:gap-10'>
        <ProfilePageButton handleClick={showBonus} name={'Dina bonusar'} />
        <ProfilePageButton handleClick={showSettings} name={'Inställningar'} />
      </nav>
      <div
        className={
          showSettingsElement && showBonusElement
            ? `mt-10 flex flex-col justify-center gap-10 w-full `
            : ` mt-10 flex justify-center`
        }
      >
        <ul className={showSettingsElement ? `${''}` : `${'hidden'}`}>
          <li className='flex flex-row'>
            Mail: <PencilSquareIcon className='h-6 w-6 text-gray-500' />
          </li>
          <li className='flex flex-row'>
            Telefonnummer:
            <PencilSquareIcon className='h-6 w-6 text-gray-500' />
          </li>
          <li className='flex flex-row'>
            Kreditkort
            <PencilSquareIcon className='h-6 w-6 text-gray-500' />
          </li>
        </ul>
        <div className={showBonusElement ? `${''}` : `${'hidden'}`}>
          <p className='flex flex-row gap-1'>
            Du har <strong className='border-b'>200</strong> bonuspoäng!
            <CurrencyDollarIcon className='h-6 w-6 text-gray-500' />
          </p>
          <span className='border-b'>Använd dem nu!</span>
        </div>
      </div>
    </section>
  );
}
