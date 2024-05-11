import Link from 'next/link';
export default function Footer() {
  type AboutFooterList = { phone?: string; info?: string };
  type FooterMediaList = { href: string; name: string };

  const aboutList: AboutFooterList[] = [
    { phone: '073123432' },
    { info: 'Bihjografengatan 12' },
    { info: 'Bihjografen@spray.se' },
  ];

  const socialMediaLinks: FooterMediaList[] = [
    { href: 'https://www.facebook.com', name: 'Facebook' },
    { href: 'https://twitter.com', name: 'Twitter/X' },
    { href: 'https://www.tiktok.com', name: 'TikTok' },
  ];
  return (
    <footer className='w-full flex justify-center text-white mt-2 mb-2 sm:w-full sm:justify-center sm:mt-2 sm:mb-2 sm:text-base'>
      <nav className='flex flex-row justify-between bg-custom_red w-10/12 rounded-xl p-2'>
        <div className='ml-3'>
          <strong>Kontakta oss</strong>
          <ul>
            {aboutList.map((info, index) => (
              <li key={index}>
                {info.phone ? (
                  <a href={`tel:${info.phone}`}>{info.phone}</a>
                ) : (
                  <span>{info.info}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className='mr-3'>
          <strong>Följ oss!</strong>
          <ul className=''>
            {socialMediaLinks.map((links, index) => (
              <li key={index} className='hover:text-custom_yellow rounded-xl'>
                <a href={links.href}>{links.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </footer>
  );
}
