import React from "react";
import "../css/custom.css";

const ContentBubble = ({ icon, doc_location, doc_name, active }) => {
  const baseClasses = `
    flex h-[105px] items-center px-[15px] py-[10px] gap-[20px] rounded-[8px]
    bg-[#F9F9F9] shadow-[0px_4px_8px_rgba(0,0,0,0.3)]
    hover:bg-[#d4d4d4] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.6)]
    dark:bg-[#464545] dark:hover:bg-[#797979]
    no-underline hover:no-underline
    lg:basis-[calc((100%-40px)/3)]
    lg:max-w-[calc((100%-40px)/3)]
    lg:min-w-[150px]
    md:basis-[calc((100%-20px)/2)]
    md:max-w-[calc((100%-20px)/2)]
    sm:basis-full sm:max-w-full
  `;

  const inactiveClasses = `
    bg-[#d4d4d4] 
    dark:bg-[#313030]
    pointer-events-none opacity-50 cursor-not-allowed
  `;

  return active ? (
    <a href={doc_location} className={baseClasses}>
      <div className="mt-0 shrink-0">
        <img src={icon} className="w-[50px] h-auto" />
      </div>
      <div className="text-ifm-primary">
        <p className="font-usace lg:text-content-bubble no-underline leading-[1.2] mb-0 md:text-normal">{doc_name}</p>
      </div>
    </a>
  ) : (
    <div className={`${baseClasses} ${inactiveClasses}`}>
      <div className="mt-0 shrink-0">
        <img src={icon} className="w-[50px] h-auto" />
      </div>
      <div className="text-ifm-primary">
        <p className="font-usace lg:text-content-bubble no-underline leading-[1.2] mb-[10px] md:text-normal">{doc_name}</p>
        <p className="font-usace lg:text-content-bubble no-underline leading-none md:text-normal">Coming soon!</p>
      </div>
    </div>
  );
};

export default ContentBubble;
