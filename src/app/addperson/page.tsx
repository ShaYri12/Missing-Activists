'use client'
import React, { useRef, useState } from 'react';
import axios from 'axios';
const AddPerson = () => {
  const fileInputRef1 = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const fileInputRef3 = useRef<HTMLInputElement | null>(null);
  const timeInputRef = useRef<HTMLInputElement | null>(null);

  const [fileName1, setFileName1] = useState<string>('');
  const [fileName2, setFileName2] = useState<string>('');
  const [fileName3, setFileName3] = useState<string>('');
  const [timePlaceholderVisible, setTimePlaceholderVisible] = useState<boolean>(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // State to store image URLs

  const [formData, setFormData] = useState({
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
  });

  const [uploading, setUploading] = useState<boolean>(false); // State to track uploading state

  const handleClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
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

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload?upload_preset=qsimo6w7`,
          formData
        );

        // Update imageUrls with the Cloudinary image URL
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls[imageIndex] = response.data.secure_url;
        setImageUrls(updatedImageUrls);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setUploading(false); // Set uploading state to false after upload completes
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     // Check if at least one image is uploaded
  if (imageUrls.length === 0) {
    alert('Please upload at least one image.');
    return;
  }

    console.log('Form data being submitted:', { ...formData, images: imageUrls }); // Log form data with image URLs

    try {
      // Send data to backend
      const response = await axios.post('/api/people/add', { ...formData, images: imageUrls });

      console.log('Response from server:', response); // Log the entire response object

      if (response.status === 201) {
        alert('Person added successfully');
        // Reset form and state
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
        });
        setFileName1('');
        setFileName2('');
        setFileName3('');
        setImageUrls([]);
      }
    } catch (error) {
      console.error('Error adding person:', error);
      alert('Error adding person. Please try again.');
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
        <h1 className="text-[32px] font-[700] leading-[38.4px]">Add Person</h1>
        <form className="flex flex-col gap-[40px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[16px]">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
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
              name="phoneNumber"
              placeholder="Phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />
            <input
              type="text"
              name="nationality"
              placeholder="Country"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />
            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />
            <input
              type="text"
              name="lastSeen"
              placeholder="Last Seen"
              value={formData.lastSeen}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
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
                name="timeSeen"
                ref={timeInputRef}
                value={formData.timeSeen}
                onChange={handleChange}
                className={`w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] ${
                  timePlaceholderVisible ? 'text-[#00000000]' : 'text-[#000000]'
                }`}
                onFocus={handleTimeFocus}
                onBlur={handleTimeBlur}
                required
              />
            </div>

            <textarea
              name="otherDetails"
              placeholder="Details"
              value={formData.otherDetails}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066] h-24"
              required
            ></textarea>
            <input
              type="number"
              name="contact1"
              placeholder="Contact 1"
              value={formData.contact1}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />
            <input
              type="number"
              name="contact2"
              placeholder="Alternative Contact (Optional)"
              value={formData.contact2}
              onChange={handleChange}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              required
            />

            <div
              onClick={() => handleClick(fileInputRef1)}
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
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
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
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
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer"
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
          </div>
          <button
            type="submit"
            className="w-full bg-[#000000] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-[16px] py-[10px] rounded-[5px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]"
          >
            Add
          </button>
        </form>
      </div>
      <a href="#" className="flex font-[400] text-[16px] leading-[16px] pb-[24px]">
        www.<span className="text-[#E31F1F] font-[700]">missing</span>activists.org
      </a>
    </div>
  );
};

export default AddPerson;
