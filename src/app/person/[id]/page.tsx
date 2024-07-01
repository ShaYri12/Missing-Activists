'use client'
import { useState } from 'react';
import Footer from '../../components/Footer';

const PersonDetail = ({ params }: { params: { id: string } }) => {
  
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  // Replace with actual data fetching logic based on id
  // For demonstration, using a static person object
  const people = [
    {
      id: '1',
      name: 'Jacob Juma',
      gender: 'Male',
      age: 27,
      image: '/assets/jacob.png',
      status: 'Missing',
    },
    {
      id: '2',
      name: 'Mercy Linda',
      gender: 'Female',
      age: 27,
      image: '/assets/mercy.png',
      status: 'Found',
    },
    {
      id: '3',
      name: 'John Kibe',
      gender: 'Male',
      age: 27,
      image: '/assets/john.png',
      status: 'Deceased',
    },
    // Add more people as needed
  ];

  // Find the person whose id matches with params.id
  const person = people.find(person => person.id === params.id);

  // If person not found, handle accordingly
  if (!person) {
    return <p>Person not found</p>;
  }

  return (
    <div className="min-h-screen px-[15px] py-[24px] text-[#000000] flex flex-col items-center justify-center bg-white">
      <input
        type="text"
        placeholder="Search"
        className="text-[14px] font-[400] leading-[19.6px] bg-[#EEF3F7] placeholder:text-[#000000] w-full rounded-[5px] py-[7px] px-[14px] mb-[15px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-white overflow-hidden relative w-full max-w-md">
        <div className="relative">
          <img src={person.image} alt={person.name} className="w-full h-auto rounded-[10px] mb-4" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 rounded-md"></div>
        </div>
        <div className='flex flex-col gap-[24px] px-[24px]'>
          <h1 className="text-[32px] font-[700] leading-[44.8px]">{person.name}</h1>
          <p className="text-[14px] font-[700] leading-[19.6px]">Age: <span className='font-[400]'>{person.age}</span></p>
          <p className="text-[14px] font-[700] leading-[19.6px]">Gender: <span className='font-[400]'>{person.gender}</span></p>
          <p className="text-[14px] font-[700] leading-[19.6px]">Status: <span className='font-[400]'>{person.status}</span></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonDetail;
