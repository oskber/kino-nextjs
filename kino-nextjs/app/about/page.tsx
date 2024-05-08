import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Om oss',
};

type Section = {
  title: string;
  content: string;
};

const aboutContent: Section[] = [
  {
    title: 'Välkomna till Bihjografen',
    content:
      'Välkomna till hjärtat av bioupplevelser i Hjo! Vi är stolta över att vara en del av denna underbara stad och att kunna erbjuda förstklassiga filmupplevelser för alla åldrar. Oavsett om du är här för en spännande blockbuster, ett hjärtevärmande familjeäventyr eller en gripande drama, ser vi fram emot att välkomna dig till Bihjografen. Låt oss tillsammans skapa oförglömliga minnen genom filmens magi. Vi ses i salongen!',
  },
  {
    title: 'Priser',
    content:
      'Vi vill att alla ska kunna njuta av en bioupplevelse, därför erbjuder vi prisvärda biljetter. För vuxna är priset 125 kr per biljett. För barn upp till 11 år och pensionärer erbjuder vi ett rabatterat pris på 100 kr per biljett. Det gör att hela familjen kan njuta av en fantastisk filmupplevelse utan att det kostar skjortan.',
  },
  {
    title: 'Bihjografens historia',
    content:
      'Bihjografen grundades av den visionära filmälskaren Gustav Svensson, som drömde om att skapa en plats där människor kunde uppleva glädjen av att se film tillsammans. Biografen byggdes år 1965 och har sedan dess varit en viktig del av Hjos kulturarv. Med sin klassiska arkitektur och moderna teknik erbjuder Bihjografen en unik blandning av tradition och innovation.',
  },
  {
    title: 'Framtid',
    content:
      'Vi på Bihjografen ser fram emot en spännande framtid. Vår vision är att fortsätta vara en mötesplats för filmälskare och att erbjuda de senaste filmerna, festivaler och evenemang som inspirerar och underhåller. Vi planerar att utöka vårt program med tematiska filmkvällar, lokala filmskaparserier och specialvisningar för skolor och föreningar.',
  },
];

const About: React.FC = () => {
  return (
    <>
      <div className='container mx-auto px-4 mt-10'>
        <div className='flex flex-col items-center pl-6 pr-6 mx-auto max-w-3xl h-screen bg-custom_black'>
          {aboutContent.map((section, index) => (
            <div key={index}>
              <h1 className='text-custom_yellow text-3xl text-center mt-12'>
                {section.title}
              </h1>
              <p className='text-white'>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
