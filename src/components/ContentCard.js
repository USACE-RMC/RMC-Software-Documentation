import React from "react";

const ContentCard = ({ icon, title }) => {
  return (
    <div className="flex w-full my-0 mx-auto h-10 mb-[10px] items-center justify-start">
      <img src={icon} alt="icon" className="h-max-[40px] w-[55px] mr-2 p-[3px] object-contain"></img>
      <p className="font-usace lg:text-[clamp(1rem,5vw,1.2rem)] md:text-[clamp(0.6rem,2.5vw,1rem)] text-ifm-primary text-left m-0">{title}</p>
    </div>
  );
};

export default ContentCard;
