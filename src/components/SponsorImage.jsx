import React from "react";

const SponsorImage = ({ sponsors }) => {
  return (
    <div className="grid justify-between grid-cols-2 lg:grid-cols-5 items-center w-full">
      {sponsors.map((sponsor, index) => (
        <div className="p-2 flex justify-center" key={index}>
          <a href={sponsor?.url || ""} target="_blank" rel="noreferrer">
            <img
              src={`${process.env.REACT_APP_BASE_URI}/storage/${sponsor.image}`}
              alt={sponsor.name}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SponsorImage;
