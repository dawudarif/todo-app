'use client';

import { useState, useEffect, FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      toast.success('Authenticated');
      router.push('/');
    }
  }, [session]);

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
        setLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        setLoading(false);
      }
    });
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
            <h1 className='text-5xl font-bold text-left'>Log In</h1>
          </div>
          <form className='space-y-5 w-[80%]' onSubmit={loginUser}>
            <div>
              <label htmlFor='email' className='font-semibold text-lg'>
                Email address
              </label>
              <div className='mt-2'>
                <input
                  className='ring-1 w-100 hover:shadow-lg p-2 rounded-lg h-10 w-[100%] lg:w-[70%] hover:ring-2 hover:ring-blue-500 '
                  id='email'
                  name='email'
                  type='email'
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='font-semibold text-lg'>
                Password
              </label>
            </div>
            <div>
              <input
                className='ring-1 hover:shadow-lg p-2 rounded-lg h-10 w-[100%] hover:ring-2 lg:w-[70%] hover:ring-blue-500 '
                id='password'
                name='password'
                type='password'
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <div>
              <button
                type='submit'
                className={`w-100 inline-flex items-center justify-center px-4 py-2 leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150  ${
                  loading ? 'cursor-not-allowed' : 'cursor-pointer'
                } bg-blue-400 hover:bg-blue-500 lg:w-[70%] hover:shadow-lg font-bold text-white rounded-lg h-10 w-[100%]`}
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
                Sign in
              </button>
            </div>
          </form>
          <div className='w-[80%] my-3'>
            <div className='lg:w-[70%] w-[100%] my-4'>
              <div className='flex items-center'>
                <div className='flex-grow h-0.5 bg-gray-300'></div>
                <span className='px-2 text-gray-500'>or</span>
                <div className='flex-grow h-0.5 bg-gray-300'></div>
              </div>
            </div>
            <button
              onClick={() => signIn('google')}
              className=' bg-red-400 hover:bg-red-500 lg:w-[70%] hover:shadow-lg  font-bold text-white rounded-lg h-10 w-[100%]'
            >
              {/* <Image
                src='../assets/google.png'
                width={20}
                height={20}
                alt='google'
              /> */}
              Sign in with Google
            </button>
            <div className='my-3'>
              <Link
                href='/register'
                className='text-blue-600 underline underline-offset-2 hover:text-blue-900'
              >
                New here? Create an Account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
