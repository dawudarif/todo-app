import Image from 'next/image';

export default function Loading() {
  return (
    <div className='bg-stone-50 flex justify-center items-center h-screen flex-col'>
      <Image src='../assets/icon.svg' alt='icon' height={200} width={200} />
      <h1 className='font-bold opacity-50 text-2xl p-10'>Loading...</h1>
    </div>
  );
}
