'use client';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './globals.css';
import MainLayout from '../components/MainLayout';
import Categories from '../components/Categories';
import Tasks from '../components/Tasks';
import { gql, useQuery } from '@apollo/client';
import Plus from '../assets/Plus';
import axios from 'axios';

export default function Page() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();
  const session = useSession();
  console.log(session);

  // const getData = async () => {
  //   const response = await axios.get('http://localhost:4000/api/tasks/task', {
  //     withCredentials: true,
  //   });
  //   const data = response.data;
  //   console.log(data);
  // };

  // getData();

  return (
    <MainLayout>
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
        className='flex flex-row'
      >
        <div className='ml-8 py-6'>
          <h1 className='font-bold text-3xl mb-6 opacity-70'>Categories</h1>
          <Categories />
        </div>
        <div className='ml-8 py-6'>
          <h1 className='font-bold text-3xl mb-6 opacity-70'>Tasks</h1>
          <Tasks />
        </div>
        <button
          className='fixed bottom-4 right-4 rounded-full bg-blue-500 text-white p-3 shadow-lg hover:bg-blue-600'
          onClick={() => setShowOptions(!showOptions)}
        >
          <Plus />
        </button>
        {showOptions && (
          <div className='fixed bottom-4 right-24 flex flex-col space-y-2'>
            <button className='rounded-md bg-blue-500 text-white py-2 px-4 hover:bg-blue-600'>
              Create Category
            </button>
            <button className='rounded-md bg-blue-500 text-white py-2 px-4 hover:bg-blue-600'>
              Create Task
            </button>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
}
