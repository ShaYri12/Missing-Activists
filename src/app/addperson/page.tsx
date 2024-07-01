'use client'
import React, { useRef, useState } from 'react';

const AddPeople = () => {
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const timeInputRef = useRef(null);

  const [fileName1, setFileName1] = useState('');
  const [fileName2, setFileName2] = useState('');
  const [fileName3, setFileName3] = useState('');
  const [timePlaceholderVisible, setTimePlaceholderVisible] = useState(true);

  const handleClick = (ref) => {
    ref.current.click();
  };

  const handleFileChange = (e, setFileName) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleTimeFocus = () => {
    setTimePlaceholderVisible(false);
    timeInputRef.current.showPicker();
  };

  const handleTimeBlur = () => {
    if (!timeInputRef.current.value) {
      setTimePlaceholderVisible(true);
    }
  };

  return (
    <div className="min-h-screen text-[#000000] flex flex-col items-center justify-center bg-white">
      <div className="bg-white px-[15px] py-[24px] flex flex-col gap-[16px] w-full max-w-lg">
        <h1 className="text-[32px] font-[700] leading-[38.4px]">Add Person</h1>
        <form className='flex flex-col gap-[40px]'>
          <div className="flex flex-col gap-[16px]">
            <input type="text" placeholder="Name" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="number" placeholder="Age" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="number" placeholder="Phone" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="text" placeholder="Country" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="text" placeholder="Occupation" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="text" placeholder="Last Seen" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            
            <div className="relative w-full">
              {timePlaceholderVisible && (
                <div
                  className="absolute inset-y-0 left-0 pl-[13px] flex items-center text-[#00000066] pointer-events-none"
                  onClick={() => timeInputRef.current.focus()}
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

            <textarea placeholder="Details" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066] h-24"></textarea>
            <input type="number" placeholder="Contact 1" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            <input type="number" placeholder="Alternative Contact (Optional)" className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]" />
            
            {/* Custom file input */}
            <div onClick={() => handleClick(fileInputRef1)} className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer">
              <span className={fileName1 ? '' : 'text-[#00000066]'}>{fileName1 || 'Attach Image 1'}</span>
            </div>
            <input type="file" ref={fileInputRef1} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setFileName1)} />
            
            <div onClick={() => handleClick(fileInputRef2)} className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer">
              <span className={fileName2 ? '' : 'text-[#00000066]'}>{fileName2 || 'Attach Image 2'}</span>
            </div>
            <input type="file" ref={fileInputRef2} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setFileName2)} />
            
            <div onClick={() => handleClick(fileInputRef3)} className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] cursor-pointer">
              <span className={fileName3 ? '' : 'text-[#00000066]'}>{fileName3 || 'Attach Image 3'}</span>
            </div>
            <input type="file" ref={fileInputRef3} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setFileName3)} />
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
  )
}

export default AddPeople;
