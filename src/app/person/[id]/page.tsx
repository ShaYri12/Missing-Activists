"use client";
import { useState } from "react";
import Footer from "../../components/Footer";

const PersonDetail = ({ params }: { params: { id: string } }) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term

  // Replace with actual data fetching logic based on id
  // For demonstration, using a static person object
  const people = [
    {
      id: "1",
      name: "Jacob Juma",
      gender: "Male",
      age: 27,
      image: "/assets/jacob.png",
      status: "Missing",
      nationality: "Kenyan",
      phoneNumber: "+254701234567",
      occupation: "Mechanic",
      lastSeen: "18 June ‘24",
      timeSeen: "12:00 PM",
      otherDetails:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      contact1: "+2547102345678",
      contact2: "+2547102345678",
    },
    {
      id: "2",
      name: "Mercy Linda",
      gender: "Female",
      age: 27,
      image: "/assets/mercy.png",
      status: "Found",
      nationality: "Ugandan",
      phoneNumber: "+256701234567",
      occupation: "Teacher",
      lastSeen: "12 July ‘24",
      timeSeen: "10:30 AM",
      otherDetails:
        "Suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Vel facilisis volutpat est velit egestas dui id. Sagittis vitae et leo duis ut. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Duis convallis convallis tellus id interdum velit laoreet id donec.",
      contact1: "+2567102345678",
      contact2: "+2567102345678",
    },
    {
      id: "3",
      name: "John Kibe",
      gender: "Male",
      age: 27,
      image: "/assets/john.png",
      status: "Deceased",
      nationality: "Tanzanian",
      phoneNumber: "+255701234567",
      occupation: "Engineer",
      lastSeen: "30 May ‘24",
      timeSeen: "3:45 PM",
      otherDetails:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      contact1: "+2557102345678",
      contact2: "+2557102345678",
    },
    // Add more people as needed
  ];
  

  // Find the person whose id matches with params.id
  const person = people.find((person) => person.id === params.id);

  // If person not found, handle accordingly
  if (!person) {
    return <p>Person not found</p>;
  }

  return (
    <div className="min-h-screen w-full text-[#000000] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-[16px] px-[15px] py-[24px] w-full">
        <input
          type="text"
          placeholder="Search"
          className="text-[14px] font-[400] leading-[19.6px] bg-[#EEF3F7] placeholder:text-[#000000] w-full rounded-[5px] py-[7px] px-[14px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-[24px] bg-white">
          <div className="relative h-[400px]">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent h-auto to-black opacity-80 rounded-[10px]"></div>
          </div>
          <div className="flex flex-col px-[24px] gap-[24px]">
            <h1 className="text-[32px] font-[700] leading-[44.8px]">
              {person.name}
            </h1>
            <div className="grid grid-cols-2 gap-y-[24px] text-[14px] leading-[19.6px]">
              <p className="font-[700] w-25">Age:</p>
              <p className="font-[400]">{person.age}</p>
              <p className="font-[700]">Gender:</p>
              <p className="font-[400]">{person.gender}</p>
              <p className="font-[700]">Status:</p>
              <p className="font-[400]">{person.status}</p>
              <p className="font-[700]">Nationality:</p>
              <p className="font-[400]">{person.nationality}</p>
              <p className="font-[700]">Phone Number:</p>
              <p className="font-[400]">{person.phoneNumber}</p>
              <p className="font-[700]">Occupation:</p>
              <p className="font-[400]">{person.occupation}</p>
              <p className="font-[700]">Last Seen:</p>
              <p className="font-[400]">{person.lastSeen}</p>
              <p className="font-[700]">Time Seen:</p>
              <p className="font-[400]">{person.timeSeen}</p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[19.6px]">
              <p className="font-[700]">Other Details:</p>
              <p className="font-[400]">{person.otherDetails}</p>
            </div>
            <div className="flex flex-col gap-[24px] text-[14px] leading-[19.6px]">
              <p className="font-[700]">Contact:</p>
              <div className="flex flex-wrap text-[#ffffff] font-[400] gap-[16px]">
                <p className="py-[10px] px-[16px] rounded-[5px] shadow bg-[#E31F1F] ">
                  {person.contact1}
                </p>
                <p className="py-[10px] px-[16px] rounded-[5px] shadow bg-[#E31F1F]">
                  {person.contact2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonDetail;
