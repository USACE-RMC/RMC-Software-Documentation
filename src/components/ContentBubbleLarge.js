import React from "react";
import ContentCard from "./ContentCard";

const ContentBubbleLarge = ({ icon, doc_location, doc_name, contentCardData = [], active }) => {
  const baseClasses = `
    flex flex-col h-[550px] items-center p-[25px] gap-[20px] rounded-[8px]
    bg-[#F9F9F9] shadow-[0px_4px_8px_rgba(0,0,0,0.3)]
    hover:bg-[#d4d4d4] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.6)]
    dark:bg-[#464545] dark:hover:bg-[#797979]
    no-underline hover:no-underline
    lg:basis-[calc((100%-40px)/3)]
    lg:max-w-[calc((100%-40px)/3)]
    lg:min-w-[150px]
    md:basis-[calc((100%-40px)/3)]
    md:max-w-[calc((100%-40px)/3)]
    md:min-w-[250px]
    sm:basis-full 
    sm:max-w-full
    sm:min-w-[250px]
  `;

  const inactiveClasses = `
    bg-[#d4d4d4] 
    dark:bg-[#313030]
    pointer-events-none opacity-50 cursor-not-allowed
  `;

  return active ? (
    <a href={doc_location} className={baseClasses}>
      <div className="flex h-[40%] justify-center">
        <img src={icon} className="w-auto h-full" />
      </div>
      <div className="text-font-color">
        <p className="font-usace lg:text-3xl md:text-xlarge sm:text-xlarge text-center no-underline leading-[1.2] mt-5 mb-0">{doc_name}</p>
      </div>
      <div className="w-fit h-[200px] mt-[10px] mb-0 mx-auto flex flex-col items-start">
        {contentCardData.map((data, index) => (
          <ContentCard key={index} icon={data.icon} title={data.title} />
        ))}
      </div>
    </a>
  ) : (
    <div className={`${baseClasses} ${inactiveClasses}`}>
      <div className="flex h-[40%] justify-center">
        <img src={icon} alt="icon" className="w-auto h-full" />
      </div>
      <div className="text-font-color">
        <p className="font-usace lg:text-3xl md:text-xlarge sm:text-xlarge text-center no-underline leading-[1.2] mt-5 mb-0">{doc_name}</p>
      </div>
      <div className="w-fit h-[200px] mt-[10px] mb-0 mx-auto flex flex-col items-start">
        {contentCardData.map((data, index) => (
          <ContentCard key={index} icon={data.icon} title={data.title} />
        ))}
      </div>
      <div className="font-usace text-xlarge md:text-normal sm:text-normal text-center no-underline text-ifm-primary leading-none">
        <p>Coming soon!</p>
      </div>
    </div>
  );
};

export default ContentBubbleLarge;
