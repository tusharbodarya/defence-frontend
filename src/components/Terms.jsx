import React from "react";
import string from "../constants/string";

// const terms = [
//     { tcbold: "Registration:", tclight: 'Your DEFENCE PARTNERSHIP DAYS 2024 registration will only be effective upon acceptance by the organizer  and sending guidelines for participation..' },
//     { tcbold: "Cancellation:", tclight: "The contract is concluded and binding. No refund or credit of any kind will be issued except in the case of cancellation of event  by Organizer.." },
//     { tcbold: "Best Efforts Obligation:", tclight: "IMR Media Pvt Ltd as the Organizer are bound only by a best efforts obligation." },
//     { tcbold: "Meeting Module: ", tclight: "All participants must pay the full price before the opening of the  Meeting Module, in order to have their corporate  presentation published in this catalogue." },
//     { tcbold: "Pre-scheduled Meetings: ", tclight: "Participants are expected to honour their scheduled meetings." },
//     { tcbold: "IPR: ", tclight: ' The Organizer will have the right to use all event materials, including but not limited to presentations and documents.' },
//     { tcbold: "Conduct: ", tclight: "Participants are expected to conduct themselves professionally and ethically during all event activities. The Organizer reserves the  right to terminate a participant's participation in the event for violation of these terms and conditions or disruptive behaviour." },
//     { tcbold: "Maintenance of the booth:", tclight: "Each participant commits to assure the maintenance of his booth and to be present at it during the event. No materials  shall be exhibited by the participants outside or above their allocated booth." },
//     { tcbold: "Information Management: ", tclight: "The event platform may involve third-party services; participants are subject to the terms and conditions of those  services. By registering to the event, each participant authorizes IMR Media Pvt Ltd to use his email address(es) and mobile numbers,  for dispatching information regarding the event and promotion of other events organized by IMR Media Pvt Ltd. These details may also be transmitted  to the organizing partners, This information will allow informing the participants about upcoming events and receiving information by email; with  personalized communication including sending newsletters, special offers and special emails within the communication framework of the event.  Moreover, IMR Media Pvt Ltd reiterates that if the participant changes his mind and no longer wishes to receive certain categories of emails, he can at  any moment contact us in order to keep us informed about these mailings." },
//     { tcbold: "Insurance: ", tclight: "It is the responsibility of each participant to have insurance covering its legal liability and all damages for which the participant may be  held responsible, such as: theft, fire, deterioration, damage or destruction of any equipment or facility.  IMR Media Pvt Ltd and its insurers waive all claims  against the exhibitors and their insurers, reciprocally, all participants and their insurers waive all claims against IMR Media Pvt Ltd and its insurers." },
//     { tcbold: "Advertising:", tclight: "Subsequent to the acceptance of the registration, the organizer authorizes all participants to mention the following sentence on its  sales and advertising correspondence: “Participating in DEFENCE PARTNERSHIP DAYS 2024, New Delhi on 28-29 Nov 2024.” Likewise, each  participant authorizes IMR Media Pvt Ltd to communicate about his/her attendance to this business convention." },
//     { tcbold: 'Image Rights:', tclight: "During the event, a photo and video device will be covering the event in order to create a film and a photo album which   could be used in promotional purposes (film-making, usage of photos in the creation of communication documents, website animation). Hence, the  participants to DEFENCE PARTNERSHIP DAYS 2024 entitle IMR Media Pvt Ltd, upon registration, to use their image exclusively within the field of   promotion of the events organized by IMR Media Pvt Ltd ." },
//     { tcbold: "Arbitration: ", tclight: 'Any dispute, controversy, or claim arising out of or relating to these terms and conditions, the event, or the breach, termination, or  validity thereof, shall be settled by arbitration in accordance with the rules of Rules of Domestic Commercial Arbitration of the Indian Council of Arbitration,  and judgment upon the award rendered by the arbitrator(s) will not be entered in any court having jurisdiction thereof. The arbitration shall be conducted  by a single arbitrator, appointed by mutual agreement between the parties. The arbitration shall take place in New Delhi unless the parties mutually agree  to a different location. All arbitration proceedings, including any awards, shall be confidential, and the parties shall maintain the confidentiality of the  arbitration as required by law..' }
// ]

const Terms = () => {
  return (
    <section className="flex justify-center py-14">
      <div className="container 3xl:w-[70%] p-4 xl:px-20 space-y-8">
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-center">
          {string.shippingPolicy.subtitle}
        </div>
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-center">
          {string.shippingPolicy.web}
        </div>
        <div className="relative heading flex justify-center mb-4 px-4">
          <h2 className="font-EBGaramond lg:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-normal uppercase">
            {string.tctitle}
          </h2>
          <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC] "></div>
        </div>
        <div className="p-4 space-y-8 text-base sm:text-lg md:text-xl lg:text-2xl">
          <div className="para text-justify py-4 text-base sm:text-lg md:text-xl lg:text-2xl">
            {string.tcpara}
          </div>
          <div>
            defencepartners.in is operated by currently provides by Organizer
            under the terms and conditions primarily set forth in this Terms of
            Use. BY ACCESSING OR USING THIS WEB SITE, YOU AGREE TO ABIDE BY THE
            TERMS OF USE.
          </div>
          <div>
            Subject to the Terms of Use, the Organizer grants you a
            non-exclusive, non-transferable, limited, conditionally revocable
            right to access, use and privately display this Web site for your
            legitimate personal and/or business needs. Any other use of this Web
            site is expressly prohibited and constitutes a material violation of
            the Terms of Use. Prohibited uses include, without limitation, using
            email addresses obtained from this Web site for solicitation
            purposes of any kind, directly or indirectly, the use of data
            mining, robots or other similar data gathering and extraction tools,
            and making any derivative works based, in whole or in part, on any
            portion or all of this Web site.
          </div>
          <div>
            You must be 18 years or older to use this Web site. Organizer
            reserves the right, at its sole discretion, to change, modify, add
            or remove the Terms of Use, in whole or in part, at any time without
            prior notice or liability. Your continued access or use of this Web
            site after any such change, modification, addition or removal of the
            Terms of Use will constitute your acceptance thereof. Further,
            Organizer reserves the right, at its sole discretion, and without
            prior notice or liability, to terminate, modify or add any features
            to this Web site at any time.
          </div>
          <div>LIMITING ACCESS</div>
          <div>
            Organizer reserves the right, as its sole discretion, and without
            prior notice or liability, to limit or terminate your access to this
            Web site and you agree to abide by such limit or termination.
          </div>
          <div>USE RESTRICTIONS</div>
          <div>
            You agree not to modify, add or delete any content on this Web site,
            without the express written permission of Organizer. Further, you
            agree not to interrupt or attempt to interrupt the operation of this
            Web site or access thereto by other users. You agree not to resell
            or otherwise exploit for commercial purposes, directly or
            indirectly, any portion of this Web site, the services offered on
            this Web site, or access to this Web site. You agree that
            information you provide to this Web site or the manufacturers and
            distributors whose products are present in any online catalogue of
            this Web site will be true and accurate to the best of your
            knowledge, and that nothing you provide shall be illegal, obscene,
            threatening, defamatory, invasive of privacy, infringing on the
            rights of, or otherwise injurious to person or property, including,
            without limitation, software viruses, worms, Trojan horses or other
            malicious code. You also agree not to use a false email address,
            impersonate any person or entity, or otherwise mislead as to the
            source of the information you provide to this Web site or to the
            manufacturers and distributors whose products are present in any
            online catalogue of this Web site.
          </div>
          <div>LINKING TO THIS WEB SITE</div>
          <div>
            You may link to this Web site, so long as it does not portray
            Organizer or its affiliates in a negative manner or otherwise
            portray its services in a false, misleading, derogatory or offensive
            manner. Further, the linking site must not contain anything illegal,
            false, misleading, derogatory or offensive, and no express or
            implied affiliation with Organizer may be indicated without
            Organizer's express written permission. Organizer reserves the right
            to require that you remove any link to this Web site for any reason,
            and you agree to carry out the removal immediately. Unless
            specifically set forth in writing by Organizer, any link to this Web
            site must not appear prominently on the linking site so as to
            confuse or mislead users as to the affiliation, sponsorship, etc. of
            Organizer and the linking site.
          </div>
          <div>OWNERSHIP AND INTELLECTUAL PROPERY</div>
          <div>This Web site is owned and operated by Organizer.</div>
          <div>
            You may view, download, print and retain a copy of pages of our Web
            site only for your own legitimate personal and/or business needs.
            Except as expressly provided above, you may not use, download,
            upload, copy, print, display, perform, reproduce, republish,
            license, post, transmit or distribute any information from our Web
            site in whole or in part without our prior written permission. If
            you wish to obtain permission to reprint or reproduce any materials
            appearing on our Web site you may contact us at
            contactus@imrmedia.in. All rights not expressly granted herein are
            reserved.
          </div>
          <div>
            “IMR”, the Organizer design and flag and other marks appearing on
            this Web Site are trademarks of Organizer. Marks without the
            registration symbol are either under application for registration
            are considered to be common law marks of Organizer. You agree not to
            use any meta tags or other hidden text utilizing Organizer’s name or
            any of its trademarks without the express written consent of
            Organizer.
          </div>
          <div>
            © 2024 IMR MEDIA PVT LTD. All Rights Reserved Throughout the World.
            Organizer claims a copyright interest in each page of this Web site
            and the Web site as a whole, as well as in the individual content,
            including, without limitation, any catalogue as a whole and all
            search forms (but excepting any individual catalogue information in
            the form provided to Organizer, which is the property of the various
            manufacturers and distributors providing such information for this
            Web site), all of which is protected by United States, India and
            international copyright laws. No portion of this Web site or the Web
            site as a whole may be copied, retransmitted, reposted, duplicated
            or otherwise used without the express written permission of
            Organizer.
          </div>
          <div>
            You acknowledge that the information Organizer has about its users,
            including, without limitation, names, email addresses, usernames,
            passwords, site usage history, etc., is governed by its Privacy
            Policy and may also be a trade secret. In addition, you acknowledge
            that any information Organizer has about the aggregate usage of this
            Web site and any agreements Organizer has with manufacturers and
            distributors providing content for this Web site are also trade
            secrets.
          </div>
          <div>GENERAL</div>
          <div>
            If any court of competent jurisdiction deems any provision of these
            Terms of Use to be unenforceable, then that provision shall be
            enforced to the extent possible to effect the intent of the Terms of
            Use, and the remaining provisions shall remain in full force and
            effect.
          </div>
          <div>
            The headings in this section of the Web site are intended solely for
            convenience and are not considered to be terms within the Terms of
            Use.
          </div>
          <div>
            The Terms of Use constitutes the entire agreement between Organizer
            and you with regard to your access and use of this Web site, and
            supersedes all prior agreements and understandings, whether written
            or oral, in connection herewith.
          </div>
          <div>NO WARRANTY/DISCLAIMER/LIMITATIONS ON DAMAGES</div>
          <div>
            Technical data and statistical information contained in any
            electronic catalogue of this Web site have been derived from
            information supplied by the respective manufacturers and
            distributors. Although we believe that the information supplied is
            generally correct, we do not assume any responsibility whatsoever
            for its accuracy. The data and information contained in any
            electronic catalogue are intended for use by persons possessing
            technical skill and knowledge. Conditions of use of the items listed
            in any electronic catalogue are beyond our knowledge or control and
            consequently we assume no liability whatsoever for results obtained
            or loss or damage incurred as a result of application of the data or
            information presented. Users of any electronic catalogue do so at
            their own risk. In addition, we assume no liability and make no
            warranty with respect to claims of patent, trademark or copyright
            infringement or other similar claims which may arise out of or in
            connection with the use of any data, information or items listed in
            any electronic catalogue.
          </div>
          <div>
            THIS WEB SITE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS AND
            IMR MEDIA SPECIFICALLY DISCLAIMS WARRANTIES OF ANY KIND, EITHER
            EXPRESSED OR IMPLIED, INLCUDING BUT NOT LIMITED TO WARRANTIES OF
            TITLE OR IMPLIED WARRANTIEES OF MERCHANTABILITY OR FITNESS FOR A
            PARTICULAR PURPOSE. NO ORAL ADVISE OR WRITTEN OR ELECTRONICALLY
            DELIVERED INFORMATION GIVEN BY IMR MEDIA OR ITS AFFILIATES, OR ANY
            OF ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PROVIDERS, MERCHANTS,
            SPONSORS, LICENSORS, OR THE LIKE, SHALL CREATE ANY WARRANTY. YOU
            EXPRESSLY AGREE THAT USE OF THE WEB SITE IS AT YOUR SOLE RISK.
          </div>
          <div>
            IN NO EVENT SHALL Organizer BE LIABLE FOR ANY INJURY, EXPENSES,
            PROFITS, LOSS OR DAMAGE, WHETHER DIRECT, INCIDENTAL, OR
            CONSEQUENTIAL, OR ANY OTHER PECUNIARY LOSS OR EXPENSE ARISING OUT OF
            THE ACCESS, USE OR INABILITY TO USE ANYTHING ON THIS WEB SITE OR ANY
            PRODUCT DESCRIBED IN ANY ELECTRONIC CATALOGUE, EVEN IF WE ARE
            EXPRESSLY ADVISED OF THE POSSIBILITY THEREOF.
          </div>
          <div>
            If, despite the language of the Terms of Use, Organizer becomes
            liable to you for anything arising out of or related in any way to
            your access, use or inability to use this Web site or any product
            described in any electronic catalogue, then Organizer total
            liability to you shall not exceed the total payments actually made
            by you to Organizer or INR 500, whichever is greater.
          </div>
          <div>INDEMNITY</div>
          <div>
            You agree to indemnify and hold Organizer and, where applicable, its
            parent, subsidiaries, officers, directors, agents and employees, as
            well as manufacturers and distributors whose content appears on this
            Web site, harmless from any claim or demand, including reasonable
            attorney’s fees, made by any third party arising out of or related
            in any way to your access, inability to access or use of this Web
            site, or any breach by you of the Terms of Use.
          </div>
          <div>THIRD PARTY SITES/EMAIL</div>
          <div>
            As a convenience to you, Organizer may provide on this Web site one
            or more links to third party Web sites and/or provide email contacts
            respecting third parties. Organizer makes no endorsement of such
            third parties, nor any representation or warranty regarding anything
            that takes place between you and any such third parties, including,
            without limitation, visits to third party Web sites, email
            correspondence with third parties, and business or other
            transactions with third parties found through this Web site. Please
            understand that such third parties are independent from and not
            controlled by Organizer, even if, for example, a Organizer link or
            logo appears on a Web site linked from this site. It is up to you to
            take whatever precautions are necessary in order to protect against
            viruses, worms, Trojan horses or other malicious code.
          </div>
          <div>INTERNATIONAL USERS</div>
          <div>
            This Web site is controlled, operated and administered by Organizer
            from within India. Organizer makes no representation that this Web
            site is available for access or use at other locations outside
            India. However, any access or use from outside India is still
            subject to the Terms of Use. Access to this Web site is expressly
            prohibited from territories where this Web site or any portion
            thereof is illegal. You agree not to access or use any information
            or materials on this Web site in violation of Indian export laws and
            regulations, or in violation of any laws or regulations in the
            country from which you are accessing this Web site.
          </div>
          <div>THIRD PARTY CONTENT ON WEB SITE</div>
          <div>
            IMR MEDIA is a distributor and not a publisher of the content
            supplied by third parties on the Web site. IMR MEDIA does not have
            editorial control over such content. Any opinions, advice,
            statements, services, offers, or other information that constitutes
            part of the content expressed or made available by third parties,
            including merchants, suppliers, providers, sponsors, licensors, or
            any customer or user of the Web site, are those of the respective
            authors or distributors and not of IMR MEDIA or its affiliates or
            any of its officers, directors, employees, or agents. Neither IMR
            MEDIA nor its affiliates, nor any of their respective officers,
            directors, employees, or agents, nor any third party, including any
            merchant, supplier, provider, sponsor, licensor, or any other
            customer or user of the Web site, guarantees the accuracy,
            completeness, or usefulness of any content, nor its merchantability
            or fitness for any particular purpose.
          </div>
          <div>
            In many instances, the content available on the Web site represents
            the opinions and judgments of the respective merchants, suppliers,
            providers, sponsors, licensors, customers or users of the Web site,
            whether or not under contract with IMR MEDIA. IMR MEDIA neither
            endorses nor is responsible for the accuracy or reliability of any
            opinion, advice, submission, posting, or statement made on the Web
            site by anyone other than authorized IMR MEDIA employees. Under no
            circumstances shall IMR MEDIA, or its affiliates, or any of their
            respective officers, directors, employees, or agents, be liable for
            any loss or damage caused by your reliance on any content or other
            information obtained through the Web site.
          </div>
          <div>COMPLIANCE WITH LAWS AND EXPORT REGULATION </div>
          <div>
            You agree to use this Web site and the content thereon in compliance
            with all applicable laws, statutes, ordinances and regulations
            governing your use of our Web site.
          </div>
          <div>ADVERTISING</div>
          <div>
            Our Web site may contain third party advertisements and/or
            sponsorships. The advertisers and/or sponsors that provide these
            advertisements and sponsorships are solely responsible for insuring
            that the materials submitted for inclusion on the Web site are
            accurate and comply with all applicable laws. We are not responsible
            for the acts or omissions of any advertiser or sponsor.
          </div>
          <div>CHOICE OF LAW/FORUM FOR DISPUTES/JURISDICTION</div>
          <div>
            The validity, construction and performance of the Term of Use of
            this Web site and the legal relations between you and Organizer
            shall be governed by and construed in accordance with the laws of
            India, excepting its choice of law rules if the application of such
            rules would result in the laws of another jurisdiction being
            applied.
          </div>
          <div>
            Any dispute between you and Organizerarising out of or relating in
            any way to your access or use of this Web site shall initially be
            addressed through confidential negotiations, which shall be treated
            as compromise and settlement negotiations under the relevant rules
            of evidence. If the matter in dispute has not been resolved within
            thirty (30) days of the initiating party’s written request for
            negotiation, the parties shall endeavour to first settle the dispute
            by mediation administered by the Indian rules. A neutral third party
            will be selected in accordance with the selection process. During
            the time period set forth below, mediation shall be the sole and
            exclusive procedure for resolution of any such dispute.
          </div>
          <div>
            Any dispute between you and Organizerdescribed in the previous
            paragraph shall be brought before an alternative dispute resolution
            body within 50 kms of Organizer’s corporate headquarters as of the
            date of the initiating party’s written request for negotiation. You
            agree that any such body shall have personal jurisdiction over you
            for purposes of any such dispute. Further, any judgment on the award
            rendered by the arbitrator may be entered only in a court within 50
            kms of Organizer’s corporate headquarters as of the date the award
            is rendered by the arbitrator. You agree that any such court shall
            have personal jurisdiction over you for purposes of any such
            judgment.
          </div>
          <div>
            You agree that the cost of mediation and any subsequent arbitration
            as described above shall be split equally between you and Organizer.{" "}
          </div>
          <div>
            Should mediation or arbitration as described herein not take place
            or not completely resolve a dispute for any reason, you agree that
            the sole jurisdiction and venue for any litigation arising from your
            use of our Web site shall be an appropriate court of law located in
            New Delhi, and you hereby submit to the jurisdiction of these
            courts.
          </div>
          <div>
            Information Management: The event platform may involve third-party
            services; participants are subject to the terms and conditions of
            those services. By registering to the event, each participant
            authorizes Organizer to use his email address(es) and mobile
            numbers, for dispatching information regarding the event and
            promotion of other events organized by Organizer. These details may
            also be transmitted to the organizing partners, This information
            will allow informing the participants about upcoming events and
            receiving information by email; with personalized communication
            including sending newsletters, special offers and special emails
            within the communication framework of the event. Moreover, Organizer
            reiterates that if the participant changes his mind and no longer
            wishes to receive certain categories of emails, he can at any moment
            contact us in order to keep us informed about these mailings.{" "}
          </div>
          <div>
            Arbitration: Any dispute, controversy, or claim arising out of or
            relating to these terms and conditions, the event, or the breach,
            termination, or validity thereof, shall be settled by arbitration in
            accordance with the rules of Rules of Domestic Commercial
            Arbitration of the Indian Council of Arbitration, and judgment upon
            the award rendered by the arbitrator(s) will not be entered in any
            court having jurisdiction thereof. The arbitration shall be
            conducted by a single arbitrator, appointed by mutual agreement
            between the parties. The arbitration shall take place in New Delhi
            unless the parties mutually agree to a different location. All
            arbitration proceedings, including any awards, shall be
            confidential, and the parties shall maintain the confidentiality of
            the arbitration as required by law.
          </div>

          {/* {terms.map((index) => (
                        <div key={index} className='font-bold py-4 text-justify text-sm md:text-base lg:text-lg xl:text-xl' >
                            {index.tcbold}
                            <p className='inline font-normal'>
                                &nbsp;{index.tclight}
                            </p>
                        </div>
                    ))} */}
        </div>
      </div>
    </section>
  );
};

export default Terms;
