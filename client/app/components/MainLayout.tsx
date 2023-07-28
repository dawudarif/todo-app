import { ReactNode, useState } from 'react';
import ProfileIcon from '../assets/ProfileIcon';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  const session = useSession();
  const [showPopup, setPopup] = useState(false);

  const imageURL = session?.data?.user?.image;
  //   console.log(session);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <nav className='bg-baseDark flex items-center p-6 h-16 text-sans text-white font-semibold font-2xl text-opacity-50'>
        <div
          className={`flex justify-start p-1 ${
            session.status === 'authenticated'
          } && hover:rounded-md hover:bg-baseLight `}
        >
          {session.status === 'authenticated' ? (
            <div className='flex justify-center items-center'>
              {imageURL ? (
                <Image
                  src={imageURL}
                  alt='icon'
                  className='hover:grayscale rounded-full mx-3'
                  height={40}
                  width={40}
                  quality={100}
                />
              ) : (
                <ProfileIcon />
              )}
              <h1 className='mr-3 capitalize'>{session?.data?.user?.name}</h1>
            </div>
          ) : (
            <ProfileIcon />
          )}
        </div>
        <div className='flex justify-center items-center ml-auto'>
          <h1 className='mx-3'>Strike</h1>
        </div>
      </nav>

      <div className='min-h-[90vh] bg-[#808387]'>{children}</div>
      <footer className='bg-baseDark flex justify-center items-center p-6 h-16 text-sans text-white font-semibold font:2xl text-opacity-50'>
        <span>&copy; </span> Strike {currentYear} by Dawood Arif
      </footer>
    </motion.div>
  );
}
