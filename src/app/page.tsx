'use client'
import { useState } from 'react';

interface Person {
  id: number;
  name: string;
  gender: string;
  age: number;
  image: string;
  status: 'Missing' | 'Found' | 'Deceased';
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [people, setPeople] = useState<Person[]>([
    {
      id: 1,
      name: 'Jacob Juma',
      gender: "Male",
      age: 27,
      image: '/assets/jacob.png',
      status: 'Missing',
    },
    {
      id: 2,
      name: 'Mercy Linda',
      gender: "Female",
      age: 27,
      image: '/assets/mercy.png',
      status: 'Found',
    },
    {
      id: 3,
      name: 'John Kibe',
      gender: "Male",
      age: 27,
      image: '/assets/john.png',
      status: 'Deceased',
    },
  ]);

  // Filter people based on search term
  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.age.toString().includes(searchTerm.toLowerCase()) ||
    person.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.gender.toLowerCase().startsWith(searchTerm.toLowerCase()) // Search by starting characters of gender
  );

  return (
    <div className="px-[15px] py-[24px]">
      <input
        type="text"
        placeholder="Search"
        className="text-[14px] font-[400] leading-[19.6px] bg-[#EEF3F7] placeholder:text-[#000000] w-full rounded-[5px] py-[7px] px-[14px] mb-[15px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-[16px] min-h-screen">
        {filteredPeople.map((person) => (
          <div key={person.id} className="relative bg-white rounded-[10px] cursor-pointer h-[400px] overflow-hidden">
            <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-md" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
            <div className="absolute inset-0 flex flex-col justify-end px-[15px] py-[16px] rounded-md">
              <div className='flex justify-between items-center'>
                <div className='font-[700] text-white'>
                  <h2 className="text-[20px] leading-[24px]">{person.name}</h2>
                  <span className='text-[14px] leading-[19.6px] text-[#DFD9D7]'>{person.gender} {person.age}</span>
                </div>
                <p className={`rounded-[5px] px-[16px] py-[10px] gap-[10px] text-white ${person.status === 'Missing' ? 'bg-[#E31F1F]' : person.status === 'Found' ? 'bg-[#00AD64]' : 'bg-[#BABABA]'}`}>
                  {person.status}
                </p>
              </div>
            </div>
            <img width={"36px"} src="/assets/Flag_of_Kenya.svg" alt="Kenya Flag" className="absolute top-2 right-2 w-8 h-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
