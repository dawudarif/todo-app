'use client';

import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      toast.success('Authenticated');
      router.push('/');
    }
  }, [session]);

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/register', data);
      toast.success('User has been registered!');
      router.push('/');
      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response);
        setLoading(false);
      } else {
        toast.error('Something went wrong!');
        setLoading(false);
      }
    }
  };

  return (
    <>
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
        className='h-screen bg-zinc-50 flex justify-center items-center'
      >
        <div className='flex justify-center items-center flex-col w-[50vw]'>
          <Image
            src='../assets/icon.svg'
            alt='icon'
            className='hover:grayscale'
            height={200}
            width={200}
          />
          <h1 className='font-bold opacity-50 text-2xl m-8'>Get Things Done</h1>
        </div>
        <div className='w-[50vw] flex justify-center items-stretch flex-col'>
          <div className='mb-12'>
            <h1 className='text-5xl font-bold text-left'>Register</h1>
          </div>
          <form className='space-y-6 w-[80%]' onSubmit={registerUser}>
            <div>
              <label className='font-semibold text-lg' htmlFor='name'>
                Name
              </label>
              <div className='mt-2'>
                <input
                  className='ring-1 hover:shadow-lg p-2 rounded-lg h-10 w-[100%] hover:ring-2 lg:w-[70%] hover:ring-blue-500 '
                  id='name'
                  name='name'
                  type='text'
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className='font-semibold text-lg' htmlFor='email'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  className='ring-1 hover:shadow-lg p-2 rounded-lg h-10 w-[100%] hover:ring-2 lg:w-[70%] hover:ring-blue-500 '
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label className='font-semibold text-lg' htmlFor='password'>
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  className='ring-1 hover:shadow-lg p-2 rounded-lg h-10 w-[100%] hover:ring-2 lg:w-[70%] hover:ring-blue-500 '
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <button
                className={`w-100 inline-flex items-center justify-center px-4 py-2 leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150  ${
                  loading ? 'cursor-not-allowed' : 'cursor-pointer'
                } lg:w-[70%] hover:shadow-lg font-bold  h-10 w-[100%]`}
                type='submit'
              >
                {loading && (
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                )}
                Register
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}
