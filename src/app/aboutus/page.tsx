import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-[#000000] px-[15px] py-[24px] flex flex-col gap-[24px]">
      <h1 className="text-[32px] font-[700] leading-[38.4px]">Help Find Missing Activists</h1>
      <section className="text-[12px] leading-[16.8px]">
        <h2 className="font-[700] pb-4">Mission:</h2>
        <p className="font-[400]">
          The primary goal of{" "}
          <a
            href="/"
            className="font-[700] hover:underline"
          >
            www.<span className="text-[#E31F1F]">missing</span>activists.org
          </a>{" "}
          is to raise awareness about the abductions of activists who speak out.
          These abductions are a blatant violation of the basic human right to
          free speech, a universally recognized concept. We invite you to join
          us in fighting for a better future and safeguarding the rights of
          activists worldwide. Together, we can create awareness and enhance the
          safety of activists across the globe. Please join our cause.
        </p>
      </section>
      <section className="flex flex-col">
        <h2 className="text-[32px] font-[700] leading-[38.4px] pb-[24px]">How Your Donation Helps</h2>
        <div className="text-[12px] leading-[16.8px] pb-4">
          <h3 className="font-[700] pb-4">Technology:</h3>
          <p className="font-[400]">
            Our efforts rely on robust technology, including servers, bandwidth,
            maintenance, development, and social media awareness and management.
          </p>
        </div>

        <div className="text-[12px] leading-[16.8px] pb-4">
          <h3 className="font-[700] pb-4">People and Projects:</h3>
          <p className="font-[400]">
            Missing Activists employs both staff and contractors to support a
            wide range of online functions, ensuring that every donation is put
            to effective use.
          </p>
        </div>

        <div className="text-[12px] leading-[16.8px] pb-4">
          <h3 className="font-[700] pb-4">Contribution Appeal:</h3>
          <p className="font-[400]">
            Any amount you contribute is invaluable—there are no small
            donations, as every contribution makes a difference. Thank you for
            your support.
          </p>
          <p className="mt-4">Thank You!</p>
        </div>
      </section>
      <section className="flex flex-col gap-[16px]">
        <div className="flex justify-around gap-[10px]">
          <div className="flex items-center justify-center shadow-custom1 shadow-custom2 rounded-[3.89px] p-2 w-[114.26px]">
            <img
                src="/assets/mpesa.svg"
                alt="M-PESA logo"
                className="py-[11px]"
                width={"43.64px"}
                height={"16px"}
            />
          </div>
          <div className="flex items-center justify-center shadow-custom1 shadow-custom2 rounded-[3.89px] p-2 w-[114.26px]">
            <img
                src="/assets/paypal.svg"
                alt="PayPal logo"
                className="py-[11px]"
                width={"60.35px"}
                height={"16px"}
            />
          </div>
          <div className="flex items-center justify-center shadow-custom1 shadow-custom2 rounded-[3.89px] p-2 w-[114.26px]">
            <img
                src="/assets/card.svg"
                alt="Credit Card logo"
                className="py-[11px]"
                width={"22.86px"}
                height={"16px"}
            />
          </div>
        </div>
        <input
          type="number"
          placeholder="Other Amount"
          className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-muted-foreground"
        />
        <input
          type="number"
          placeholder="Enter Phone Number"
          className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-muted-foreground"
        />

        <p className="text-[12px] font-[400] leading-[16.8px]">
          You will receive a prompt on your Safaricom number.
        </p>

        <button className="w-full bg-[#000000] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-[16px] py-[10px] rounded-[5px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]">
          Pay
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
