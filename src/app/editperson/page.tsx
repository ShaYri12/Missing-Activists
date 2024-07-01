'use client';
import React, { useRef, useState } from 'react';

const EditPerson = () => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const [fileName1, setFileName1] = useState<string>('');
  const [fileName2, setFileName2] = useState<string>('');
  const [fileName3, setFileName3] = useState<string>('');
  const [timePlaceholderVisible, setTimePlaceholderVisible] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [status, setStatus] = useState<string>(''); // State for status dropdown

  const handleClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="min-h-screen text-[#000000] flex flex-col items-center justify-center bg-white">
      <div className="bg-white px-[15px] py-[24px] flex flex-col gap-[16px] w-full max-w-lg">
        <input
          type="text"
          placeholder="Search"
          className="text-[14px] font-[400] leading-[19.6px] bg-[#EEF3F7] placeholder:text-[#000000] w-full rounded-[5px] py-[7px] px-[14px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <h1 className="text-[32px] font-[700] leading-[38.4px]">Edit Person</h1>
        <form className="flex flex-col gap-[40px]">
          <div className="flex flex-col gap-[16px]">
            <input
              type="text"
              placeholder="Name"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="text"
              placeholder="Gender"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="number"
              placeholder="Phone"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="text"
              placeholder="Occupation"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="text"
              placeholder="Last Seen"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
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
                onFocus={handleTimeFocus}
                onBlur={handleTimeBlur}
              />
            </div>

            <textarea
              placeholder="Details"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066] h-24"
            ></textarea>
            <input
              type="number"
              placeholder="Contact 1"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />
            <input
              type="number"
              placeholder="Alternative Contact (Optional)"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
            />

            {/* Custom file input */}
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
              onChange={(e) => handleFileChange(e, setFileName1)}
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
              onChange={(e) => handleFileChange(e, setFileName2)}
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
              onChange={(e) => handleFileChange(e, setFileName3)}
            />

            {/* Status dropdown */}
            <select
              className={`w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] ${status === "" ? "text-[#00000066]" : ""}`}
              value={status}
              onChange={handleStatusChange}
            >
              <option className='text-[#000000]' value="">Status (Dropdown)</option>
              <option className='text-[#000000]' value="missing">Missing</option>
              <option className='text-[#000000]' value="found">Found</option>
              <option className='text-[#000000]' value="deceased">Deceased</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#000000] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-[16px] py-[10px] rounded-[5px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]"
          >
            Save
          </button>
          <button
            type="submit"
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
