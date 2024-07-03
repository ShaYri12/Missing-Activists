'use client';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditPerson = () => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<any>({
    name: '',
    age: '',
    gender: '',
    phoneNumber: '',
    nationality: '',
    occupation: '',
    lastSeen: '',
    timeSeen: '',
    otherDetails: '',
    contact1: '',
    contact2: '',
    status: ''
  });

  const [fileName1, setFileName1] = useState<string>('');
  const [fileName2, setFileName2] = useState<string>('');
  const [fileName3, setFileName3] = useState<string>('');
  const [timePlaceholderVisible, setTimePlaceholderVisible] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [searchResults, setSearchResults] = useState<any[]>([]); // State for search results
  const [selectedPerson, setSelectedPerson] = useState<any>(null); // State for selected person
  const [uploading, setUploading] = useState<boolean>(false); // State to track uploading state
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store image URLs
  
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
    if (searchTerm) {
      fetchPersons(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Handle selecting a person from search results
  const handleSelectPerson = (person: any) => {
    setSelectedPerson(person);
    setFormData({
      name: person.name || '',
      age: person.age || '',
      gender: person.gender || '',
      phoneNumber: person.phoneNumber || '',
      nationality: person.nationality || '',
      occupation: person.occupation || '',
      lastSeen: person.lastSeen || '',
      timeSeen: person.timeSeen || '',
      otherDetails: person.otherDetails || '',
      contact1: person.contact1 || '',
      contact2: person.contact2 || '',
      status: person.status || ''
    });
    setImageUrls(person.images)
    setFileName1(person.images[0] || '');
    setFileName2(person.images[1] || '');
    setFileName3(person.images[2] || '');
    setTimePlaceholderVisible(false);
    setSearchResults([]);
  };

  const cloudinaryConfig = {
    cloudName: 'dazko9ugd',
    apiKey: '229314452358913',
    apiSecret: 'a60Y6vKeapSAgxHNtGpOsPhwNGY',
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileName: React.Dispatch<React.SetStateAction<string>>,
    imageIndex: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
  
      try {
        setUploading(true); // Set uploading state to true
  
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
  
        // Log formData to inspect its contents
        console.log('FormData:', formData);
  
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload?upload_preset=qsimo6w7`,
          formData
        );
  
        // Update imageUrls with the Cloudinary image URL
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls[imageIndex] = response.data.secure_url;
        setImageUrls(updatedImageUrls);
      } catch (error: any) {
        console.error('Error uploading image to Cloudinary:', error.response?.data || error.message);
        toast.error('Error uploading image. Please try again.');
      } finally {
        setUploading(false); // Set uploading state to false after upload completes or fails
      }
    }
  };
  
  
  const handleClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleTimeFocus = () => {
    setTimePlaceholderVisible(false);
    if (timeInputRef.current) {
      timeInputRef.current.focus();
    }
  };

  const handleTimeBlur = () => {
    if (timeInputRef.current && !timeInputRef.current.value) {
      setTimePlaceholderVisible(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
  console.log(selectedStatus)
    setFormData({
      ...formData,
      status: selectedStatus
    });
    console.log("formDataStatus: ", formData.status)
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      gender: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (!selectedPerson || !selectedPerson._id) {
        console.error('Selected person or ID is missing.');
        toast.error("Selected person or ID is missing.")
        return;
      }
      else if (imageUrls.length === 0) {
        toast.info('Please upload at least one image.');
        return;
      }    

      const response = await axios.put(`/api/people/${selectedPerson._id}`, {
        id: selectedPerson._id,
        ...formData,
        images: imageUrls,
      });

      console.log('Person updated successfully', response.data.person);
      toast.success("Person Updated Successfully");

      setFormData({
        name: response.data.person.name || '',
        age: response.data.person.age || '',
        gender: response.data.person.gender || '',
        phoneNumber: response.data.person.phoneNumber || '',
        nationality: response.data.person.nationality || '',
        occupation: response.data.person.occupation || '',
        lastSeen: response.data.person.lastSeen || '',
        timeSeen: response.data.person.timeSeen || '',
        otherDetails: response.data.person.otherDetails || '',
        contact1: response.data.person.contact1 || '',
        contact2: response.data.person.contact2 || '',
        status: response.data.person.status || '',
      });

      setSelectedPerson(response.data.person);

    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedPerson || !selectedPerson._id) {
        console.error('Selected person or ID is missing.');
        return;
      }
  
      // Send DELETE request to delete the person
      const response = await axios.delete(`/api/people/${selectedPerson._id}`, {
        data: {
          id: selectedPerson._id
        }
      });
  
      console.log('Person deleted successfully');
      toast.success('Person Deleted Successfully');
  
      // Clear form data and selected person state
      setFormData({
        name: '',
        age: '',
        gender: '',
        phoneNumber: '',
        nationality: '',
        occupation: '',
        lastSeen: '',
        timeSeen: '',
        otherDetails: '',
        contact1: '',
        contact2: '',
        status: ''
      });
  
      setSelectedPerson(null);
    } catch (error) {
      console.error('Error deleting person:', error);
      toast.error('Error deleting person. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen text-[#000000] flex flex-col items-center justify-center bg-white">
      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8">
            <p className="text-[#000000] text-lg font-semibold">Uploading...</p>
          </div>
        </div>
      )}
      <div className="bg-white px-[15px] py-[24px] flex flex-col gap-[16px] w-full max-w-lg">
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
        <h1 className="text-[32px] font-[700] leading-[38.4px]">Edit Person</h1>
        <form className="flex flex-col gap-[40px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[16px]">
            <input
              type="text"
              placeholder="Name"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              required
              className={`w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] ${formData.gender == "" && "text-[#00000066]"}`}
            >
              <option className='text-[#000000]' value="">Gender</option>
              <option className='text-[#000000]' value="Male">Male</option>
              <option className='text-[#000000]' value="Female">Female</option>
              <option className='text-[#000000]' value="Other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Phone"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Occupation"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Seen"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="lastSeen"
              value={formData.lastSeen}
              onChange={handleInputChange}
            />

            <div className="relative w-full">
              {timePlaceholderVisible && (
                <div
                  className="absolute inset-y-0 left-0 pl-[13px] flex items-center text-[#00000066] pointer-events-none"
                  onClick={() => timeInputRef.current && timeInputRef.current.focus()}
                >
                  Time
                </div>
              )}
              <input
                type="time"
                ref={timeInputRef}
                className={`w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] ${
                  timePlaceholderVisible ? 'text-[#00000000]' : 'text-[#000000]'
                }`}
                name="timeSeen"
                onFocus={handleTimeFocus}
                onBlur={handleTimeBlur}
                value={formData.timeSeen}
                onChange={handleInputChange}
              />
            </div>

            <textarea
              placeholder="Details"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066] h-24"
              name="otherDetails"
              value={formData.otherDetails}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="number"
              placeholder="Contact 1"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="contact1"
              value={formData.contact1}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="Alternative Contact (Optional)"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              name="contact2"
              value={formData.contact2}
              onChange={handleInputChange}
            />

            {/* Custom file input */}
            <div
              onClick={() => handleClick(fileInputRef1)}
              className="overflow-hidden w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
            >
              <span className={fileName1 ? '' : 'text-[#00000066]'}>
                {fileName1 || 'Attach Image 1'}
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef1}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setFileName1, 0)}
            />

            <div
              onClick={() => handleClick(fileInputRef2)}
              className="overflow-hidden w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
            >
              <span className={fileName2 ? '' : 'text-[#00000066]'}>
                {fileName2 || 'Attach Image 2'}
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef2}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setFileName2, 1)}
            />

            <div
              onClick={() => handleClick(fileInputRef3)}
              className="overflow-hidden w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
            >
              <span className={fileName3 ? '' : 'text-[#00000066]'}>
                {fileName3 || 'Attach Image 3'}
              </span>
            </div>
            <input
              type="file"
              ref={fileInputRef3}
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e, setFileName3, 2)}
            />

            {/* Status dropdown */}
            <select
              className={`w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] ${
                formData.status === '' ? 'text-[#00000066]' : ''
              }`}
              value={formData.status}
              onChange={handleStatusChange}
              name="status"
            >
              <option value="" disabled>
                Status (Dropdown)
              </option>
              <option className="text-[#000000]" value="Missing">
                Missing
              </option>
              <option className="text-[#000000]" value="Found">
                Found
              </option>
              <option className="text-[#000000]" value="Deceased">
                Deceased
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#000000] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-[16px] py-[10px] rounded-[5px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full text-[#E31F1F] text-[16px] font-[400] leading-[16px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]"
          >
            Delete
          </button>
        </form>
      </div>
      <a href="#" className="flex font-[400] text-[16px] leading-[16px] pb-[24px]">
        www.<span className="text-[#E31F1F] font-[700]">missing</span>
        activists.org
      </a>
    </div>
  );
};

export default EditPerson;
