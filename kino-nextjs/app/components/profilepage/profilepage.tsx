'use client';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import ProfilePageButton from './ProfileCtaButton';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
// import { getUser } from '../../lib/actions';
import { useState, useEffect } from 'react';

// interface UserData {
//   email: string;
//   name: string;
// }

export default function ProfilePage() {
  //   const [user, setUser] = useState<User | null>(null);
  //   useEffect(() => {
  //     async function fetchUser() {
  //       const userData = await getUser();
  //       setUser(userData);
  //     }
  //     fetchUser();
  //   }, []);

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
      <div className='flex justify-evenly mr-2 ml-2 mt-10 sm:justify-center sm:gap-10'>
        <ProfilePageButton handleClick={showBonus} name={'Dina bonusar'} />
        <ProfilePageButton handleClick={showSettings} name={'Inställningar'} />
      </div>
      <div
        className='mt-10 flex flex-col gap-5'
        // className={
        //   showSettingsElement && showBonusElement
        //     ? `mt-10 flex content-center gap-10 bg-red-500`
        //     : ` mt-10 flex justify-center`
        // }
      >
        <div
          className={
            showSettingsElement ? `${'flex justify-center'}` : `${'hidden'}`
          }
        >
          <ul>
            <li className='flex flex-row'>
              Mail:
              {/* Mail: {`${user?.email}`} */}
              <PencilSquareIcon className='h-6 w-6 text-gray-500' />
            </li>
            <li className='flex flex-row'>
              Telefonnummer:
              <PencilSquareIcon className='h-6 w-6 text-gray-500' />
            </li>
            <li className='flex flex-row'>
              Kreditkort:
              <PencilSquareIcon className='h-6 w-6 text-gray-500' />
            </li>
          </ul>
        </div>
        <div
          className={
            showBonusElement ? `${'flex justify-center gap-1'}` : `${'hidden'}`
          }
        >
          <p className='flex flex-row gap-1'>
            Du har <strong className='border-b'>200</strong>
            <CurrencyDollarIcon className='h-6 w-6 text-gray-500' /> bonuspoäng!
          </p>
          <span className='border-b cursor-wait'>Använd dem nu!</span>
        </div>
      </div>
    </section>
  );
}
