import Link from 'next/link';
export default function Footer() {
  type AboutList = {
    phone: string;
    adress: string;
    mail: string;
  };
  type SocialMedia = [
    { href: string; name: string },
    { href: string; name: string },
    { href: string; name: string }
  ];
  const aboutList: AboutList = {
    phone: '073123432',
    adress: 'Bihjografengatan 12',
    mail: 'Bihjografen@spray.se',
  };

  const socialMediaLinks: SocialMedia = [
    { href: 'https://www.facebook.com', name: 'Facebook' },
    { href: 'https://twitter.com', name: 'Twitter/X' },
    { href: 'https://www.tiktok.com', name: 'TikTok' },
  ];
  return (
    <footer className='w-full flex justify-center'>
      <nav className='flex flex-row justify-between dark:bg-custom_red w-10/12 rounded-xl'>
        <div>
          <strong>Kontakta oss</strong>
          <ul>
            <li>{aboutList.phone}</li>
            <li>{aboutList.adress}</li>
            <li>{aboutList.mail}</li>
          </ul>
        </div>

        <div className='text-yellow-400'>
          <strong>Följ oss!</strong>
          <ul className=''>
            {socialMediaLinks.map((links, index) => (
              <li key={index}>
                <Link href={links.href}>{links.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </footer>
  );
}
