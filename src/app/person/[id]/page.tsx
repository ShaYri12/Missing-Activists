'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";

const PersonDetail = ({ params }: { params: { id: string } }) => {
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [transitionClass, setTransitionClass] = useState<string>("opacity-100");

  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [searchResults, setSearchResults] = useState<any[]>([]); // State for search results
  const [selectedPerson, setSelectedPerson] = useState<any>(null); // State for selected person

  useEffect(() => {
    const fetchInitialPerson = async () => {
      try {
        const response = await axios.post(`/api/people/${params.id}`, { id: params.id });
        setPerson(response.data.person);
      } catch (error: any) {
        setError(error.message || "Failed to fetch person");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPerson();
  }, [params.id]);

  // Fetch persons based on search term
  const fetchPersons = async (term: string) => {
    try {
      const response = await axios.get(`/api/people?search=${term}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  // Handle search term change
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchPersons(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Handle selecting a person from search results
  const handleSelectPerson = (selected: any) => {
    setSelectedPerson(selected);
    setSearchTerm(''); // Clear search term when a person is selected
    setSearchResults([]); // Clear search results
  };

  // Determine which person data to display
  const displayPerson = selectedPerson || person;

  const nextImage = () => {
    setTransitionClass("opacity-0");
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === displayPerson.images.length - 1 ? 0 : prevIndex + 1
      );
      setTransitionClass("opacity-100");
    }, 300);
  };

  const prevImage = () => {
    setTransitionClass("opacity-0");
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? displayPerson.images.length - 1 : prevIndex - 1
      );
      setTransitionClass("opacity-100");
    }, 300);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!displayPerson) {
    return <p>Person not found</p>;
  }

  return (
    <div className="min-h-screen w-full text-[#000000] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-4 px-4 py-6 w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="text-[14px] font-[400] leading-[19.6px] bg-[#EEF3F7] placeholder:text-[#000000] w-full rounded-[5px] py-[7px] px-[14px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-md z-10">
              {searchResults.map((result) => (
                <li
                  key={result._id}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectPerson(result)}
                >
                  {result.name} - {result.gender}
                </li>
              ))}
            </ul>
          )}
        </div>
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
              src={displayPerson.images[currentImageIndex]}
              alt={displayPerson.name}
              className={`w-full h-full object-cover rounded transition-all duration-500 ${transitionClass}`}
            />
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
              {displayPerson.images.map((image: string, index: number) => (
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
            <h1 className="text-2xl font-bold leading-10">{displayPerson.name}</h1>
            <div className="grid grid-cols-2 gap-y-6 text-sm leading-5">
              <p className="font-bold">Age:</p>
              <p className="font-normal">{displayPerson.age}</p>
              <p className="font-bold">Gender:</p>
              <p className="font-normal">{displayPerson.gender}</p>
              <p className="font-bold">Status:</p>
              <p className="font-normal">{displayPerson.status}</p>
              <p className="font-bold">Nationality:</p>
              <p className="font-normal">{displayPerson.nationality}</p>
              <p className="font-bold">Phone Number:</p>
              <p className="font-normal">{displayPerson.phoneNumber}</p>
              <p className="font-bold">Occupation:</p>
              <p className="font-normal">{displayPerson.occupation}</p>
              <p className="font-bold">Last Seen:</p>
              <p className="font-normal">{displayPerson.lastSeen}</p>
              <p className="font-bold">Time Seen:</p>
              <p className="font-normal">{displayPerson.timeSeen}</p>
            </div>
            <div className="flex flex-col gap-6 text-sm leading-5">
              <p className="font-bold">Other Details:</p>
              <p className="font-normal">{displayPerson.otherDetails}</p>
            </div>
            <div className="flex flex-col gap-6 text-sm leading-5">
              <p className="font-bold">Contact:</p>
              <div className="flex flex-wrap text-white font-normal gap-4">
                <p className="py-2 px-4 rounded shadow bg-red-600">
                  +{displayPerson.contact1}
                </p>
                <p className="py-2 px-4 rounded shadow bg-red-600">
                  +{displayPerson.contact2}
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
