'use client';
import { print } from 'graphql';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Edit from '../assets/Edit';
import Delete from '../assets/Delete';
import Info from '../assets/Info';
import { gql, useQuery } from '@apollo/client';
import Plus from '../assets/Plus';
import { error } from 'console';

const query = gql`
  query MyQuery {
    tasks {
      id
      text
    }
  }
`;
const uri = 'http://localhost:4000/graphql';

export default function Tasks() {
  const { data: taskQuery, error } = useQuery(query);
  console.log(taskQuery);
  console.log(error);

  // try {
  //   fetch(uri, {
  //     method: 'POST',
  //     headers: {
  //       accept: '*/*',
  //       'content-type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       query: print(query),
  //       operationName: 'MyQuery', // replace with the operation name in the query you send
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => console.log(result));
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <div className='rounded-lg p-3 bg-zinc-50 h-[80vh] w-[70vw] '>
      {taskQuery?.tasks?.map((item: any) => {
        return (
          <div key={item.id} className='h-10 flex items-center justify-between'>
            <div className='p-2 flex items-center'>
              <div className='flex items-center'>
                <input type='checkbox' className='mr-3 h-4 w-4' />
                <p>{item.text}</p>
              </div>
            </div>
            <div>
              <div className='flex items-center opacity-50 hover:opacity-100'>
                <button>
                  <Info />
                </button>
                <button>
                  <Edit />
                </button>
                <button>
                  <Delete />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
