import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import Frame from './components/Frame';
import Header from './components/Header';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Begin"
    }
  ],
  image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/Qme4FXhoxHHfyzTfRxSpASbMF8kajLEPkRQWhwWu9pkUjm/0.png`,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`,
});

export const metadata: Metadata = {
  title: 'Playgotchi - Mini Game',
  description: 'A mini game created by Guardians of Play',
  openGraph: {
    title: 'Playgotchi - Mini Game',
    description: 'A mini game created by Guardians of Play',
    images: [`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/QmPz45YLKgvjhGbhY8SvcFyP2fyADzH1bfoouvCk5EzdGp/playgotchi-bottom.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <div className='flex min-h-screen flex-col items-center justify-between"'>
        <Header />
        <Frame />
        <div className="text-white text-lg text-center p-8">Press a key or tap on mobile </div>
      </div>
    </>
  );
}