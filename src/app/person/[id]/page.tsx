"use client";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";

const PersonDetail = ({ params }: { params: { id: string } }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transitionClass, setTransitionClass] = useState("opacity-100"); // Start with opacity 100 for initial image

  const people = [
    {
      id: "1",
      name: "Jacob Juma",
      gender: "Male",
      age: 27,
      images: [
        "/assets/jacob.png",
        "/assets/jacob.png",
        "/assets/jacob.png",
      ],
      status: "Missing",
      nationality: "Kenyan",
      phoneNumber: "+254701234567",
      occupation: "Mechanic",
      lastSeen: "18 June ‘24",
      timeSeen: "12:00 PM",
      otherDetails: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus delectus eum, sunt minus ut tenetur laudantium accusantium. Rerum vel, sit nobis eos facere veritatis consequuntur. Deleniti qui illo mollitia quae.",
      contact1: "+2547102345678",
      contact2: "+2547102345678",
    },
    {
      id: "2",
      name: "Mercy Linda",
      gender: "Female",
      age: 27,
      images: [
        "/assets/mercy.png",
        "/assets/mercy.png",
        "/assets/mercy.png",
      ],
      status: "Found",
      nationality: "Kenyan",
      phoneNumber: "+256701234567",
      occupation: "Teacher",
      lastSeen: "12 July ‘24",
      timeSeen: "10:30 AM",
      otherDetails: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus delectus eum, sunt minus ut tenetur laudantium accusantium. Rerum vel, sit nobis eos facere veritatis consequuntur. Deleniti qui illo mollitia quae.",
      contact1: "+2567102345678",
      contact2: "+2567102345678",
    },
    {
      id: "3",
      name: "John Kibe",
      gender: "Male",
      age: 27,
      images: [
        "/assets/john.png",
        "/assets/john.png",
        "/assets/john.png",
      ],
      status: "Deceased",
      nationality: "Kenyan",
      phoneNumber: "+255701234567",
      occupation: "Engineer",
      lastSeen: "30 May ‘24",
      timeSeen: "3:45 PM",
      otherDetails: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus delectus eum, sunt minus ut tenetur laudantium accusantium. Rerum vel, sit nobis eos facere veritatis consequuntur. Deleniti qui illo mollitia quae.",
      contact1: "+2557102345678",
      contact2: "+2557102345678",
    },
  ];

  const person = people.find((person) => person.id === params.id);

  if (!person) {
    return <p>Person not found</p>;
  }

  const nextImage = () => {
    setTransitionClass("opacity-0"); // Fade out the current image
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === person.images.length - 1 ? 0 : prevIndex + 1
      );
      setTransitionClass("opacity-100"); // Fade in the next image
    }, 300); // Adjust the timeout as needed for the transition duration
  };

  const prevImage = () => {
    setTransitionClass("opacity-0"); // Fade out the current image
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? person.images.length - 1 : prevIndex - 1
      );
      setTransitionClass("opacity-100"); // Fade in the previous image
    }, 300); // Adjust the timeout as needed for the transition duration
  };

  useEffect(() => {
    // Set initial opacity on component mount
    setTransitionClass("opacity-100");
  }, []);

  return (
    <div className="min-h-screen w-full text-[#000000] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-4 px-4 py-6 w-full">
        <input
          type="text"
          placeholder="Search"
          className="text-sm font-normal leading-5 bg-[#EEF3F7] placeholder:text-black w-full rounded py-2 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-6 bg-white">
          <div
            className="bg-gray-400 relative h-[400px] cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const middle = rect.width / 2;

              if (clickX < middle) {
                prevImage();
              } else {
                nextImage();
              }
            }}
          >
            <img
              src={person.images[currentImageIndex]}
              alt={person.name}
              className={`w-full h-full object-cover rounded transition-all duration-500 ${transitionClass}`}
            />
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
              {person.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-[8px] h-[8px] rounded-full z-10 transition-all duration-500 ease-in-out ${
                    index === currentImageIndex ? "bg-[#E8EAED]" : "bg-[#E8EAED]"
                  }`}
                >
                  {index !== currentImageIndex && (
                    <div className="absolute top-1/2 left-1/2 w-[4px] h-[4px] rounded-full bg-black transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 rounded"></div>
          </div>
          <div className="flex flex-col px-6 gap-6">
            <h1 className="text-2xl font-bold leading-10">{person.name}</h1>
            <div className="grid grid-cols-2 gap-y-6 text-sm leading-5">
              <p className="font-bold">Age:</p>
              <p className="font-normal">{person.age}</p>
              <p className="font-bold">Gender:</p>
              <p className="font-normal">{person.gender}</p>
              <p className="font-bold">Status:</p>
              <p className="font-normal">{person.status}</p>
              <p className="font-bold">Nationality:</p>
              <p className="font-normal">{person.nationality}</p>
              <p className="font-bold">Phone Number:</p>
              <p className="font-normal">{person.phoneNumber}</p>
              <p className="font-bold">Occupation:</p>
              <p className="font-normal">{person.occupation}</p>
              <p className="font-bold">Last Seen:</p>
              <p className="font-normal">{person.lastSeen}</p>
              <p className="font-bold">Time Seen:</p>
              <p className="font-normal">{person.timeSeen}</p>
            </div>
            <div className="flex flex-col gap-6 text-sm leading-5">
              <p className="font-bold">Other Details:</p>
              <p className="font-normal">{person.otherDetails}</p>
            </div>
            <div className="flex flex-col gap-6 text-sm leading-5">
              <p className="font-bold">Contact:</p>
              <div className="flex flex-wrap text-white font-normal gap-4">
                <p className="py-2 px-4 rounded shadow bg-red-600">
                  {person.contact1}
                </p>
                <p className="py-2 px-4 rounded shadow bg-red-600">
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
