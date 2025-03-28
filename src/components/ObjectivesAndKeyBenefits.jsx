// src/components/ObjectivesAndKeyBenefits.js
import React from 'react';
import objectivesImage from '../assets/obj.png';

const ObjectivesAndKeyBenefits = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-extrabold text-center mb-8">
        OBJECTIVES <span className="font-normal">AND</span> KEY BENEFITS
      </h2>
      <div className="text-wrap">
        <div className="image-wrap">
          <img
            src={objectivesImage}
            alt="Objectives and Key Benefits"
            className="rounded-lg float-start shadow-lg w-full h-auto sm:w-1/2 md:w-1/3"
          />
        </div>
        <div className="text-content space-y-4">
          <p>
            <strong>DEFENCE PARTNERSHIP DAYS</strong> is a very focused B2G (Business to Government) and B2B (Business to Business) event with guaranteed face-to-face 1-to-1 meetings of 20 mins each, over two days.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Industry participants will be able to meet all important officers in the Government and the Services who deal with acquisition, procurement, RFIs, RFPs, Indigenisation, Import Substitution, Make projects and so on. This otherwise would involve considerable time and investment by participants to organize on their own.
            </li>
            <li>
              Face-to-face meetings will help in clarity on projects and prospects of business and collaboration. Presentations and workshops in the parallel programme will also help in obtaining information on schemes and clarity in procedures and processes involved in doing business.
            </li>
            <li>
              The Government and the Armed Forces will partly achieving their goals of Indigenisation, getting solutions to Problem Statements, and increasing the pool of industry in the Defence Ecosystem by drawing in the huge untapped potential of capable, successful and technology-rich companies.
            </li>
            <li>
              The event will help in skill mapping and capability indexing of industry.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ObjectivesAndKeyBenefits;
