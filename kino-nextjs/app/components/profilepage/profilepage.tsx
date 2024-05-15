'use client';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import ProfilePageButton from './ProfileCtaButton';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { User } from 'next-auth';

export default function ProfilePage({ userData }: { userData: User }) {
 
  
  useEffect(() =>{
    function setCurrentUser(){
      const currentUser = userData;
     setUser(currentUser)

    }
    setCurrentUser()
  })
  
  const [user, setUser] = useState<User | undefined>();
  const [showBonusElement, setShowBonus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleBonus = () => setShowBonus(!showBonusElement);
  const toggleSettings = () => setShowSettings(!showSettings);
  return (
    <section className='text-white w-full border-t-2 border-custom_yellow mt-10 mb-10'>
      <div className='flex justify-center mt-10'>
        <TrophyIcon className='h-20 w-20  text-yellow-500 ' />
      </div>
      <div className='flex justify-center'>
        <strong> Du är guldmedlem!</strong>
      </div>
      <div className='flex justify-evenly mr-2 ml-2 mt-10 sm:justify-center sm:gap-10'>
        <ProfilePageButton handleClick={toggleBonus} name={'Dina bonusar'} />
        <ProfilePageButton
          handleClick={toggleSettings}
          name={'Inställningar'}
        />
      </div>
      <div className='mt-10 flex flex-col gap-5'>
        <div
          className={showSettings ? `${'flex justify-center'}` : `${'hidden'}`}
        >
          <ul>
            <li className='flex flex-row'>
              Mail:
              {`${user?.email}`}
              <PencilSquareIcon height={6} width={6} className='h-6 w-6 text-gray-500' />
            </li>
            <li className='flex flex-row'>
              Telefonnummer:
              <PencilSquareIcon height={6} width={6} className='h-6 w-6 text-gray-500' />
            </li>
            <li className='flex flex-row'>
              Kreditkort:
              <PencilSquareIcon height={6} width={6} className='h-6 w-6 text-gray-500' />
            </li>
          </ul>
        </div>
        <div
          className={
            showBonusElement ? `${'flex justify-center gap-1'}` : `${'hidden'}`
          }
        >
          <p className='flex flex-row gap-1'>
            Du har <strong className='text-custom_yellow'>200</strong>
            <CurrencyDollarIcon className='h-6 w-6 text-custom_yellow' />{' '}
            bonuspoäng!
          </p>
          <span className='cursor-wait text-custom_yellow'>Använd dem nu!</span>
        </div>
      </div>
    </section>
  );
}
