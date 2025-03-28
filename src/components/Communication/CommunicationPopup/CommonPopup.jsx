import React, { useEffect, useRef, useState } from 'react'
import string from '../../../constants/string'
import { FaArrowLeft } from 'react-icons/fa'
import upload from '../../../assets/upload.png'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCommunicationOptions, getMechanicalData, updateCommunicationOptions } from '../../../apiEndpoints'
import Swal from 'sweetalert2'
import pdf from './../../../assets/uploadedDocument.jpg'
import uploadDocument from './../../../assets/uploadDocument.png'

const CommonPopup = ({ onClick, onClose, point1, point2, point3, point4, btn, index, value, bluetext, uploadarray, uploadarray2, assouploadarray1, assouploadarray2, pointasso1, pointasso2, pointasso3 }) => {
    const [loading, setLoading] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [imagePreviews, setImagePreviews] = useState({
        company_banner: null,
        article_image1: null,
        article_image2: null,
        speaker_photo: upload,
        presentation_file: null,
        banner_creative_file: null,
        full_page_advt_creative_file: null,
        half_page_advt_creative_file: null,
        back_cover_advt_creative_file: null,
        inside_front_cover_advt_creative_file: null,
        inside_back_cover_advt_creative_file: null,
    });
    const [formData, setFormData] = useState({
        text: "",
        external_article_url: "",
        article: "",
        workshop_topic: "",
        speaker_name: "",
        speaker_biodata: "",
        number_of_pages: "",
        contact_person_name: "",
        contact_person_mobile: "",
        contact_person_email: "",
        document_name: "",
        company_banner: null,
        article_image1: null,
        article_image2: null,
        speaker_photo: null,
        presentation_file: null,
        banner_creative_file: null,
        full_page_advt_creative_file: null,
        half_page_advt_creative_file: null,
        back_cover_advt_creative_file: null,
        inside_front_cover_advt_creative_file: null,
        inside_back_cover_advt_creative_file: null,
    });
    const [charCount, setCharCount] = useState({
        workshop_topic: 0,
        speaker_name: 0,
        speaker_biodata: 0,
        text: 0,
        article: 0,
    });
    const [error, setError] = useState({
        workshop_topic: "",
        speaker_name: "",
        speaker_biodata: "",
        text: "",
        article: "",
    });
    // Define character limits for each input field
    const charLimits = {
        workshop_topic: 100,
        speaker_name: 100,  // Example limit for the second field
        speaker_biodata: 500, // Example limit for the third field
        text: 1000,
        article: 600,
    };
    const company_bannerRef = useRef(null);
    const article_image1Ref = useRef(null);
    const article_image2Ref = useRef(null);
    const speaker_photoRef = useRef(null);
    const presentation_fileRef = useRef(null);
    const banner_creative_fileRef = useRef(null);
    const full_page_advt_creative_fileRef = useRef(null);
    const half_page_advt_creative_fileRef = useRef(null);
    const back_cover_advt_creative_fileRef = useRef(null);
    const inside_front_cover_advt_creative_fileRef = useRef(null);
    const inside_back_cover_advt_creative_fileRef = useRef(null);
    // const document_nameRef = useRef(null);

    const handleImageClick = (ref) => {
        if (ref && ref.current) {
            ref.current.click();
        }
    };

    // Handle file upload and preview with validation based on subcategory
    const handleFileChange = (event, fieldName) => {
        const file = event.target.files[0];

        // Apply size limits based on subcategory
        let sizeLimit = 0;
        if (subcategory === "E7" || subcategory === "E9" || subcategory === "E10" || subcategory === "E11" || subcategory === "E8") {
            sizeLimit = 26214400; // 25 MB for Advt file
        } else if (subcategory === "E4") {
            sizeLimit = 52428800; // 50 MB for Advt file
        } else if (subcategory === "E5") {
            sizeLimit = 104857600; // 100 MB for Advt file
        } else if (fieldName === "speaker_photo") {
            sizeLimit = 1048576; // 1MB for speaker Photo
        } else if (fieldName === "presentation_file") {
            sizeLimit = 26214400;
        }

        if (sizeLimit > 0 && file.size > sizeLimit) {
            alert(`File size should not exceed ${sizeLimit / 1048576} MB for ${fieldName ? fieldName : "Advt creative file."}`);
            event.target.value = null; // Reset the file input
            return;
        }

        const fileUrl = URL.createObjectURL(file);

        setImagePreviews((prevPreviews) => ({
            ...prevPreviews,
            [fieldName]: { fileUrl, fileName: file.name },
        }));

        // Update formData with the new file
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: file,
        }));
        // Show success alert after uploading the document
        Swal.fire({
            icon: "success",
            title: "Document Uploaded",
            text: "Your document has been uploaded successfully.",
        });
    };


    const handleClose = () => {
        navigate(-1)
    }
    const payRef = useRef(null);
    const handleClickOutside = (e) => {
        if (payRef.current && !payRef.current.contains(e.target)) {
            handleClose();
        }
    };
    useEffect(() => {
        // lock scroll 
        document.body.style.overflow = "hidden";
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { subcategory } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate("/savedProfile");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (subcategory) {
                    const response = await fetchCommunicationOptions(subcategory);
                    if (response?.success) {
                        const data = response?.data?.[0];
                        console.log(response)
                        // Map the data to form fields correctly
                        setFormData({
                            text: data?.text || "",
                            external_article_url: data?.external_article_url || "",
                            article: data?.article || "",
                            workshop_topic: data?.workshop_topic || "",
                            speaker_name: data?.speaker_name || "",
                            speaker_biodata: data?.speaker_biodata || "",
                            number_of_pages: data?.number_of_pages || "",
                            contact_person_name: data?.contact_person_name || "",
                            contact_person_mobile: data?.contact_person_mobile || "",
                            contact_person_email: data?.contact_person_email || "",
                            document_name: data?.document_name || "",
                            company_banner: null,
                            article_image1: null,
                            article_image2: null,
                            speaker_photo: null,
                            presentation_file: null,
                            banner_creative_file: null,
                            full_page_advt_creative_file: null,
                            half_page_advt_creative_file: null,
                            back_cover_advt_creative_file: null,
                            inside_front_cover_advt_creative_file: null,
                            inside_back_cover_advt_creative_file: null,
                        });



                        setOriginalData({
                            text: data?.text,
                            external_article_url: data?.external_article_url,
                            article: data?.article,
                            workshop_topic: data?.workshop_topic,
                            speaker_name: data?.speaker_name,
                            speaker_biodata: data?.speaker_biodata,
                            number_of_pages: data?.number_of_pages,
                            contact_person_name: data?.contact_person_name,
                            contact_person_mobile: data?.contact_person_mobile,
                            contact_person_email: data?.contact_person_email,
                        });

                        setImagePreviews({
                            company_banner: data?.company_banner
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.company_banner}` : "",
                            article_image1: data?.article_image1
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.article_image1}` : "",
                            article_image2: data?.article_image2
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.article_image2}` : "",
                            speaker_photo: data?.speaker_photo
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.speaker_photo}` : "",
                            presentation_file: data?.presentation_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.presentation_file}` : "",
                            banner_creative_file: data?.banner_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.banner_creative_file}` : "",
                            full_page_advt_creative_file: data?.full_page_advt_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.full_page_advt_creative_file}` : "",
                            half_page_advt_creative_file: data?.half_page_advt_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.half_page_advt_creative_file}` : "",
                            back_cover_advt_creative_file: data?.back_cover_advt_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.back_cover_advt_creative_file}` : "",
                            inside_front_cover_advt_creative_file: data?.inside_front_cover_advt_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.inside_front_cover_advt_creative_file}` : "",
                            inside_back_cover_advt_creative_file: data?.inside_back_cover_advt_creative_file
                                ? `${process.env.REACT_APP_BASE_URI}/storage/${data.inside_back_cover_advt_creative_file}` : "",
                        });
                    } else {
                        Swal.fire(
                            "Error",
                            response?.message || "Error fetching data",
                            "error"
                        );
                    }
                }
            } catch (error) {
                // Swal.fire("Error", "Failed to fetch data", "error");
            }
        };

        fetchData();
    }, [subcategory]);


    const handleSave = async (e) => {
        e.preventDefault(); // Prevent page reload

        setLoading(true);
        const form = new FormData();
        form.append("category", subcategory);
        Object.keys(formData).forEach((key) => {
            if (formData[key] && formData[key] !== originalData[key]) {
                form.append(key, formData[key]);
            }
        });
        try {
            const response = await updateCommunicationOptions(form);
            if (response?.success) {
                navigate("/savedProfile");
            } else {
                Swal.fire(
                    "Error",
                    response?.message || "Error updating profile",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire("Error", "Error updating profile", "error");
        } finally {
            setLoading(false);
        }

    };
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Validation: Name fields should not contain numbers
        if (name === "contact_person_name") {
            if (/\d/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Name cannot contain numbers",
                }));
                return;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        if (name === "number_of_pages" || name === "contact_person_mobile") {
            // Check if the value contains non-numeric characters (anything other than digits)
            if (/[^\d]/.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Only numbers are allowed",
                }));
                return;
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        // Update form data
        if (value.length <= charLimits[name]) {
            setFormData({
                ...formData,
                [name]: value,
            });
            setCharCount({
                ...charCount,
                [name]: value.length,
            });
            setError({
                ...error,
                [name]: "", // Clear error if valid
            });
        } else {
            setError({
                ...error,
                [name]: `Character limit exceeded. Max ${charLimits[name]} characters allowed.`,
            });
        }
    };


    const handleMechanicalData = async (e) => {
        e.preventDefault(); // Prevent default behavior of form submission or button click

        try {
            // Fetch the mechanical data (PDF)
            const response = await getMechanicalData();

            // Check if the response has a proper status and contains data
            if (response.status === 200 && response.data) {
                console.log("PDF found");

                // Use the response data directly (it's already a Blob)
                const pdfUrl = URL.createObjectURL(response.data);

                // Open the PDF in a new tab
                window.open(pdfUrl, '_blank');

                // Clean up: Revoke the object URL after a short delay to ensure it loads
                setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
            } else {
                console.log('No PDF data received');
            }
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };



    const subcategoryData = {
        E1: { category: "E1_2", title: string.workshopTitle, disc: string.workshopTitleDisc, workshopLabel1: string.workshopLabel1, workshopLabel2: string.workshopLabel2, workshopLabel3: string.speakerBio, uploadtitle1: string.speakerPhoto, uploadtitle2: string.presentationFile, uploaddisc1: string.uploadSpeakerPhoto, uploaddisc2: string.presentationFilePhoto, btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, uploadsize1: string.uploadSpeakerPhotosize, uploadsize2: string.presentationFilePhotosize },
        E2: { category: "E1_2", title: string.presentationTitle, disc: string.presentationTitleDisc, workshopLabel1: string.workshopLabel1, workshopLabel2: string.workshopLabel2, workshopLabel3: string.speakerBio, uploadtitle1: string.speakerPhoto, uploadtitle2: string.presentationFile, uploaddisc1: string.uploadSpeakerPhoto, uploaddisc2: string.presentationFilePhoto, btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, uploadsize1: string.uploadSpeakerPhotosize, uploadsize2: string.presentationFilePhotosize },
        E3: { category: "E3", title: string.newsletterpopup, disc: string.newsletterpopupdisc, uploadCompanyBanner: string.newsletterupload, uploadCompanyBannerDisc: string.newsletteruploadblue, uploadCompanyBannerSize: string.newsletteruploadbluesize, text: "Text to go with Banner", text2: "URL link to external article (optional)", text3: "Article (if hosting required on IMR website. (optional))", uploadtitle1: string.uploadArticle1, uploadtitle2: string.uploadArticle2, uploaddisc1: string.uploadArticleImage1, uploaddisc2: string.uplaodArticleImage2, btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, uploadsize1: string.uploadArticleImage1Size, uploadsize2: string.uploadArticleImage2Size },
        E4: { category: "E4_5_7_8_9_10_11", title: string.standeepop, disc: string.stabdeeDisc, ref: banner_creative_fileRef, uploadCompanyBanner: "Upload banner creative file", uploadCompanyBannerDisc: "Upload Indoor Banner creative file here", uploadCompanyBannerSize: "(3 x 6 ft WxH, high resolution jpg or pdf, Max 50 MB)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, },
        E5: { category: "E4_5_7_8_9_10_11", title: string.standeepop, disc: string.stabdeeDisc, ref: banner_creative_fileRef, uploadCompanyBanner: "Upload banner creative file", uploadCompanyBannerDisc: "Upload Indoor Banner creative file here", uploadCompanyBannerSize: " (8x6 ft WxH high resolution jpg or pdf, Max 100 MB)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, },
        E6: { category: "E6", title: string.literature, disc: string.literaturedisc, workshopLabel1: "Name of document", workshopLabel2: "Number of pages", workshopLabel3: "Name of Contact Person", workshopLabel4: "Mob No. of contact person", workshopLabel5: "Email of contact person", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, },
        E7: { category: "E4_5_7_8_9_10_11", title: "Full Page Advt in Event Guide", disc: string.stabdeeDisc, ref: full_page_advt_creative_fileRef, uploadCompanyBanner: "Upload Full Page Advt creative file", uploadCompanyBannerDisc: "Upload Full Page Advt creative file here", uploadCompanyBannerSizeAdvt: "(the Advt size is 213mmx277mm (WxH) and max size is 25MB.)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, seedata: "See mechanical data" },
        E8: { category: "E4_5_7_8_9_10_11", title: "Half Page Advt in Event Guide", disc: string.stabdeeDisc, ref: half_page_advt_creative_fileRef, uploadCompanyBanner: "Upload Half page Advt creative file", uploadCompanyBannerDisc: "Upload Half page Advt creative file here", uploadCompanyBannerSizeAdvt: "(Half Page Advt size is 124mmx194mm (HxW) and max size 25MB.)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, seedata: "See mechanical data" },
        E9: { category: "E4_5_7_8_9_10_11", title: "Back Cover Advt in Event Guide", disc: string.stabdeeDisc, ref: back_cover_advt_creative_fileRef, uploadCompanyBanner: "Upload Back Cover Advt creative file", uploadCompanyBannerDisc: "Upload Back Cover Advt creative file here", uploadCompanyBannerSizeAdvt: "(the Advt size is 213mmx277mm (WxH) and max size is 25MB.)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, seedata: "See mechanical data" },
        E10: { category: "E4_5_7_8_9_10_11", title: "Inside Front Cover Advt in Event Guide", disc: string.stabdeeDisc, ref: inside_front_cover_advt_creative_fileRef, uploadCompanyBanner: "Upload Inside Front Cover Advt creative file", uploadCompanyBannerDisc: "Upload Inside Front Cover Advt creative file here", uploadCompanyBannerSizeAdvt: "(the Advt size is 213mmx277mm (WxH) and max size is 25MB.)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, seedata: "See mechanical data" },
        E11: { category: "E4_5_7_8_9_10_11", title: "Inside Back Cover Advt in Event Guide", disc: string.stabdeeDisc, ref: inside_back_cover_advt_creative_fileRef, uploadCompanyBanner: "Upload Inside Back Cover Advt creative file", uploadCompanyBannerDisc: "Upload Inside Back Cover Advt creative file here", uploadCompanyBannerSizeAdvt: "(the Advt size is 213mmx277mm (WxH) and max size is 25MB.)", btn1: string.exhibitionDoItLaterBtn, btn2: string.exhibitionSubmitBtn, seedata: "See mechanical data" },
    }

    const { title, disc, workshopLabel1, workshopLabel2, workshopLabel3, text, text2, text3, uploadCompanyBanner, uploadCompanyBannerDisc, uploadCompanyBannerSize, uploadCompanyBannerSizeAdvt, uploadtitle1, uploadtitle2, uploaddisc1, uploaddisc2, uploadsize1, uploadsize2, btn1, btn2, seedata, category, workshopLabel4, workshopLabel5, ref } = subcategoryData[subcategory];
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-opacity-100 bg-black/25 backdrop-blur-lg">
            <div
                // ref={payRef} 
                className="container 3xl:w-[70%] w-[85%] font-poppins lg:w-[70%] 2xl:w-[60%] overflow-hidden h-full max-h-[80vh]">
                <div className='rounded-xl bg-white p-2 md:px-6 h-full overflow-y-auto'>
                    <div className=' md:flex md:flex-col pb-4 md:gap-2'>
                        <div>
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-2 font-semibold text-xl rounded-full bg-footerblue text-white p-1 px-2 pr-3"
                            >
                                <FaArrowLeft /> Back
                            </button>
                        </div>
                        <div className={` ${uploadCompanyBanner ? 'flex flex-col gap-1' : ''} `}>
                            <div>
                                <h2 className='font-semibold text-base md:text-lg lg:text-xl xl:text-2xl '>{subcategory}{" "}{title}</h2>
                                <div className='text-xs md:text-sm xl:text-base  text-iconborder font-normal'>{disc}</div>
                            </div>
                            {(category === "E1_2") && (
                                <>
                                    <div className='flex gap-2 w-full'>
                                        <div className='w-[50%]'>
                                            <div className='text-sm md:text-base xl:text-lg  '>
                                                {workshopLabel1}
                                            </div>
                                            <input
                                                name="workshop_topic"
                                                id=""
                                                type='text'
                                                // value={formData.data.workshop_topic || ""} // Ensure fallback value
                                                value={formData.workshop_topic || ""}
                                                onChange={handleInputChange}
                                                className='w-full p-2 outline-none rounded-md bg-communicationbg' />
                                            <div className="text-right text-gray-500">
                                                {charCount.workshop_topic}/{charLimits.workshop_topic}
                                            </div>
                                            {error.workshop_topic && (
                                                <div className="text-red text-sm">
                                                    {error.workshop_topic}
                                                </div>
                                            )}
                                        </div>
                                        <div className='w-[50%]'>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel2}</div>
                                            <input
                                                name="speaker_name"
                                                value={formData?.speaker_name || ""}
                                                onChange={handleInputChange}
                                                id=""
                                                className='w-full p-2 outline-none rounded-md bg-communicationbg' />
                                            <div className="text-right text-gray-500">
                                                {charCount.speaker_name}/{charLimits.speaker_name}
                                            </div>
                                            {error.speaker_name && (
                                                <div className="text-red text-sm">
                                                    {error.speaker_name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel3}</div>
                                        <textarea
                                            name="speaker_biodata"
                                            id="speaker_biodata"
                                            value={formData.speaker_biodata || ""}
                                            onChange={handleInputChange}
                                            className='w-full p-2 outline-none rounded-md bg-communicationbg'></textarea>
                                        <div className="text-right text-gray-500">
                                            {charCount.speaker_biodata}/{charLimits.speaker_biodata}
                                        </div>
                                        {error.speaker_biodata && (
                                            <div className="text-red text-sm">
                                                {error.speaker_biodata}
                                            </div>
                                        )}
                                        {/* <div className='text-right text-footerblue text-xs md:text-sm xl:text-base 2xl:text-lg'>(Max: 50 words)</div> */}
                                    </div>
                                    <div className='flex gap-2 '>
                                        <div className='w-[50%] p-1 text-center'>
                                            <div className='text-left text-sm md:text-base xl:text-lg  '>{uploadtitle1}</div>
                                            <div onClick={() => handleImageClick(speaker_photoRef)}
                                                className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                                                        ${imagePreviews.speaker_photo
                                                        ? "p-2 lg:p-4"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                                                    {imagePreviews.speaker_photo ? (
                                                        <img
                                                            src={!imagePreviews.speaker_photo.fileUrl ? imagePreviews.speaker_photo : imagePreviews.speaker_photo.fileUrl}
                                                            alt="Presentation File Preview"
                                                            className={`absolute top-0 left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover ${imagePreviews.speaker_photo ? "w-[60%] h-full " : "w-12 lg:w-24 h-12 lg:h-24 xl:top-4"}`}
                                                        />
                                                    ) : (
                                                        <img src={upload} alt="Upload Icon" className="w-12 h-12 absolute top-4 xl:top-8 2xl:top-12" />
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={speaker_photoRef}
                                                        style={{ display: "none" }}
                                                        onChange={(e) =>
                                                            handleFileChange(e, "speaker_photo")
                                                        }
                                                    />
                                                    {!imagePreviews.speaker_photo &&
                                                        <div className="text-center absolute bottom-6 pb-2 px-1">
                                                            <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                                {uploaddisc1}
                                                            </div>
                                                            <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                                {uploadsize1}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[50%] p-1 text-center'>
                                            <div className='text-left text-sm md:text-base xl:text-lg  '>{uploadtitle2}</div>
                                            <div onClick={() => handleImageClick(presentation_fileRef)}
                                                className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                                                        ${imagePreviews.presentation_file
                                                        ? "p-2 lg:p-4"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl ">
                                                    {imagePreviews.presentation_file ? (
                                                        <img
                                                            src={pdf}
                                                            alt="Presentation File Preview"
                                                            className="w-24 h-36 absolute top-4 xl:top-8"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={pdf}
                                                            alt="Presentation File Preview"
                                                            className="w-24 h-36 absolute top-4 xl:top-8 2xl:top-8"
                                                        />
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={presentation_fileRef}
                                                        style={{ display: "none" }}
                                                        onChange={(e) =>
                                                            handleFileChange(e, "presentation_file")
                                                        }
                                                    />
                                                    {!imagePreviews.presentation_file &&
                                                        <div className="text-center absolute bottom-6 pb-2 px-1">
                                                            <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                                {uploaddisc2}
                                                            </div>
                                                            <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                                {uploadsize2}
                                                            </div>
                                                        </div>
                                                    }
                                                    {/* Show file name if available */}
                                                    {imagePreviews.presentation_file && (
                                                        <div className="absolute -bottom-1 text-footerblue/80 text-sm">
                                                            {imagePreviews.presentation_file.fileName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {category === "E3" &&
                                <>
                                    <div className=''>
                                        <div className=' text-sm md:text-base xl:text-lg '>{uploadCompanyBanner}</div>
                                        <div
                                            onClick={() => handleImageClick(company_bannerRef)}
                                            className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.company_banner
                                                    ? "p-2 lg:p-4"
                                                    : ""
                                                }`}
                                        >
                                            <div className="relative w-full h-0 pb-[25%] md:pb-[22%] xl:pb-[20%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                                                {imagePreviews.company_banner ? (

                                                    <img
                                                        src={!imagePreviews.company_banner.fileUrl ? imagePreviews.company_banner : imagePreviews.company_banner.fileUrl}
                                                        alt="Presentation File Preview"
                                                        className={`absolute  left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover ${imagePreviews.company_banner ? "w-[50%] h-full top-0" : "top-8 w-12 lg:w-24 h-12 lg:h-24 xl:top-4"}`}
                                                    />
                                                ) : (
                                                    <img src={upload} alt="Upload Icon" className="w-12 h-12 absolute top-4 lg:top-8 xl:top-12" />
                                                )}
                                                <input
                                                    type="file"
                                                    ref={company_bannerRef}
                                                    style={{ display: "none" }}
                                                    onChange={(e) =>
                                                        handleFileChange(e, "company_banner")
                                                    }
                                                />
                                                {!imagePreviews.company_banner &&
                                                    <div className="text-center absolute bottom-0 pb-2 px-1">
                                                        <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                            {uploadCompanyBannerDisc}
                                                        </div>
                                                        <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                            {uploadCompanyBannerSize}
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='text-sm md:text-base xl:text-lg  '>{text}</div>
                                        <textarea name="text" type="text" onChange={handleInputChange} id="" value={formData.text || ""} className='w-full p-2 outline-none rounded-md bg-communicationbg'></textarea>
                                        <div className="text-right text-gray-500">
                                            {charCount.text}/{charLimits.text}
                                        </div>
                                        {error.text && (
                                            <div className="text-red text-sm">
                                                {error.text}
                                            </div>
                                        )}
                                        {/* <div className='text-right text-footerblue text-xs md:text-sm '>(Max: 50 words)</div> */}
                                    </div>
                                    <div className=''>
                                        <div className='text-sm md:text-base xl:text-lg  '>{text2}</div>
                                        <textarea name="external_article_url" id="" onChange={handleInputChange} value={formData.external_article_url || ""} className='w-full p-2 outline-none rounded-md bg-communicationbg'></textarea>
                                    </div>
                                    <div className=''>
                                        <div className='text-sm md:text-base xl:text-lg  '>{text3}</div>
                                        <textarea name="article" id="" onChange={handleInputChange} value={formData.article || ""} className='w-full p-2 outline-none rounded-md bg-communicationbg'></textarea>
                                        <div className="text-right text-gray-500">
                                            {charCount.article}/{charLimits.article}
                                        </div>
                                        {error.article && (
                                            <div className="text-red text-sm">
                                                {error.article}
                                            </div>
                                        )}
                                        {/* <div className='text-right text-footerblue text-xs md:text-sm '>(Up to 600 words)</div> */}
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='w-[50%] p-1 text-center'>
                                            <div className='text-left text-sm md:text-base xl:text-lg  '>{uploadtitle1}</div>
                                            <div
                                                onClick={() => handleImageClick(article_image1Ref)}
                                                className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.article_image1
                                                        ? "p-2 lg:p-4"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                                                    {imagePreviews.article_image1 ? (
                                                        <img
                                                            src={!imagePreviews.article_image1.fileUrl ? imagePreviews.article_image1 : imagePreviews.article_image1.fileUrl}
                                                            alt="Presentation File Preview"
                                                            className={`absolute left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover ${imagePreviews.article_image1 ? "w-full h-full top-0" : " top-8 w-12 lg:w-24 h-12 lg:h-24 xl:top-4"}`}
                                                        />
                                                    ) : (
                                                        <div className='h-full w-full flex flex-col gap-4 justify-center items-center pb-4 absolute top-0'>
                                                            <img src={upload} alt="Upload Icon" className="w-12 h-12  " />
                                                            <div className="text-center  px-1">
                                                                <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                                    {uploaddisc1}
                                                                </div>
                                                                <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                                    {uploadsize2}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={article_image1Ref}
                                                        style={{ display: "none" }}
                                                        onChange={(e) =>
                                                            handleFileChange(e, "article_image1")
                                                        }
                                                    />
                                                    {/* {!imagePreviews.article_image1 &&
                                                        
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[50%] p-1 text-center'>
                                            <div className='text-left text-sm md:text-base xl:text-lg  '>{uploadtitle2}</div>
                                            <div
                                                onClick={() => handleImageClick(article_image2Ref)}
                                                className={` flex flex-col justify-center items-center rounded-md bg-communicationbg 
                      ${imagePreviews.article_image2
                                                        ? "p-2 lg:p-4"
                                                        : ""
                                                    }`}
                                            >
                                                <div className="relative w-full h-0 pb-[50%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                                                    {imagePreviews.article_image2 ? (
                                                        <img
                                                            src={!imagePreviews.article_image2.fileUrl ? imagePreviews.article_image2 : imagePreviews.article_image2.fileUrl}
                                                            alt="Presentation File Preview"
                                                            className={`absolute left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover ${imagePreviews.article_image2 ? "w-full h-full top-0" : "top-8 w-12 lg:w-24 h-12 lg:h-24 xl:top-4"}`}
                                                        />
                                                    ) : (
                                                        <div className='h-full w-full flex flex-col gap-4 justify-center items-center pb-4 absolute top-0'>
                                                            <img src={upload} alt="Upload Icon" className="w-12 h-12 " />
                                                            <div className="text-center px-1">
                                                                <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                                    {uploaddisc2}
                                                                </div>
                                                                <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                                    {uploadsize2}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        ref={article_image2Ref}
                                                        style={{ display: "none" }}
                                                        onChange={(e) =>
                                                            handleFileChange(e, "article_image2")
                                                        }
                                                    />
                                                    {/* {!imagePreviews.article_image2 &&
                                                       
                                                    } */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                            {(category === "E6") ? (
                                <>
                                    <div className='text-xs md:text-sm xl:text-base  text-iconborder font-normal'>Organisers will contact the person named below for further coordination.</div>
                                    <div className='grid grid-cols-2 gap-2 w-full my-4'>
                                        <div className=''>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel1}</div>
                                            <input name="document_name" value={formData.document_name || ""} id="" onChange={handleInputChange} className='w-full p-2 outline-none rounded-md bg-communicationbg' />
                                        </div>
                                        <div className=''>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel2}</div>
                                            <input name="number_of_pages" value={formData.number_of_pages || ""} id="" onChange={handleInputChange} className='w-full p-2 outline-none rounded-md bg-communicationbg' />
                                        </div>
                                        <div className=''>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel3}</div>
                                            <input name="contact_person_name" value={formData.contact_person_name || ""} id="" onChange={handleInputChange} className='w-full p-2 outline-none rounded-md bg-communicationbg ' />
                                        </div>
                                        <div className=''>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel4}</div>
                                            <input name="contact_person_mobile" value={formData.contact_person_mobile || ""} id="" onChange={handleInputChange} className='w-full p-2 outline-none rounded-md bg-communicationbg' />
                                        </div>
                                        <div className='col-span-2'>
                                            <div className='text-sm md:text-base xl:text-lg  '>{workshopLabel5}</div>
                                            <input name="contact_person_email" value={formData.contact_person_email || ""} id="" onChange={handleInputChange} className='w-full p-2 outline-none rounded-md bg-communicationbg ' />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {category === "E4_5_7_8_9_10_11" && (
                                <div className=''>
                                    <div className='text-sm md:text-base xl:text-lg'>{uploadCompanyBanner}</div>
                                    <div
                                        onClick={() => handleImageClick(ref)}
                                        className={`flex flex-col justify-center items-center rounded-md bg-communicationbg 
          ${imagePreviews.banner_creative_file ? 'p-2 lg:p-4' : ''}`}
                                    >
                                        <div className="relative w-full h-0 pb-[30%] flex flex-col items-center justify-center overflow-hidden rounded-lg xl:rounded-3xl">
                                            {imagePreviews.banner_creative_file ? (
                                                // <svg
                                                //     xmlns="http://www.w3.org/2000/svg"
                                                //     version="1.1"
                                                //     width="256"
                                                //     height="400"
                                                //     viewBox="0 0 256 400"
                                                //     className="absolute top-0 left-[50%] right-[50%] transform -translate-x-1/2 md:-translate-y-0 object-cover w-full h-full"
                                                // >
                                                //     <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                                //         <polygon
                                                //             points="13.58,3.08 13.58,87.39 76.94,87.39 76.94,19.53 59.41,2"
                                                //             style={{
                                                //                 fill: "rgb(255,255,255)",
                                                //                 opacity: 1,
                                                //             }}
                                                //         />
                                                //         <path
                                                //             d="M 73.922 90 H 16.078 c -2.764 0 -5.013 -2.249 -5.013 -5.013 v -8.408 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 8.408 c 0 0.559 0.455 1.013 1.013 1.013 h 57.844 c 0.559 0 1.013 -0.454 1.013 -1.013 V 20.358 L 58.577 4 H 16.078 c -0.559 0 -1.013 0.454 -1.013 1.013 v 41.021 c 0 1.104 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 5.013 C 11.065 2.249 13.314 0 16.078 0 h 43.327 c 0.53 0 1.039 0.211 1.414 0.586 l 17.529 17.529 c 0.375 0.375 0.586 0.884 0.586 1.414 v 65.458 C 78.935 87.751 76.686 90 73.922 90 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }}
                                                //         />
                                                //         <path
                                                //             d="M 63.35 78.403 H 8.469 c -1.892 0 -3.427 -1.534 -3.427 -3.427 V 48.164 c 0 -1.892 1.534 -3.427 3.427 -3.427 H 63.35 c 1.892 0 3.427 1.534 3.427 3.427 v 26.813 C 66.777 76.869 65.243 78.403 63.35 78.403 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }}
                                                //         />
                                                //         <path d="M 21.072 64.789 h -5.996 c -0.829 0 -1.5 -0.672 -1.5 -1.5 V 53.35 c 0 -0.828 0.671 -1.5 1.5 -1.5 h 5.996 c 2.406 0 4.363 1.957 4.363 4.363 v 4.213 C 25.435 62.832 23.478 64.789 21.072 64.789 z M 16.577 61.789 h 4.496 c 0.751 0 1.363 -0.611 1.363 -1.363 v -4.213 c 0 -0.752 -0.611 -1.363 -1.363 -1.363 h -4.496 V 61.789 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }} />
                                                //         <path d="M 15.077 71.595 c -0.829 0 -1.5 -0.672 -1.5 -1.5 v -6.806 c 0 -0.828 0.671 -1.5 1.5 -1.5 s 1.5 0.672 1.5 1.5 v 6.806 C 16.577 70.923 15.905 71.595 15.077 71.595 z" style={{
                                                //             fill: "rgb(196,28,28)",
                                                //             opacity: 1,
                                                //         }} />
                                                //         <path d="M 37.196 71.595 h -5.702 c -0.829 0 -1.5 -0.672 -1.5 -1.5 V 53.35 c 0 -0.828 0.671 -1.5 1.5 -1.5 h 5.702 c 2.568 0 4.657 2.09 4.657 4.658 v 10.43 C 41.853 69.506 39.764 71.595 37.196 71.595 z M 32.994 68.595 h 4.202 c 0.914 0 1.657 -0.743 1.657 -1.657 v -10.43 c 0 -0.914 -0.744 -1.658 -1.657 -1.658 h -4.202 V 68.595 z" style={{
                                                //             fill: "rgb(196,28,28)",
                                                //             opacity: 1,
                                                //         }} />
                                                //         <path d="M 48.218 71.595 c -0.828 0 -1.5 -0.672 -1.5 -1.5 V 53.35 c 0 -0.828 0.672 -1.5 1.5 -1.5 s 1.5 0.672 1.5 1.5 v 16.745 C 49.718 70.923 49.046 71.595 48.218 71.595 z" style={{
                                                //             fill: "rgb(196,28,28)",
                                                //             opacity: 1,
                                                //         }} />
                                                //         <path d="M 57.076 54.85 h -8.858 c -0.828 0 -1.5 -0.672 -1.5 -1.5 s 0.672 -1.5 1.5 -1.5 h 8.858 c 0.828 0 1.5 0.672 1.5 1.5 S 57.904 54.85 57.076 54.85 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }} />
                                                //         <path d="M 54.02 63.223 h -5.802 c -0.828 0 -1.5 -0.672 -1.5 -1.5 s 0.672 -1.5 1.5 -1.5 h 5.802 c 0.828 0 1.5 0.672 1.5 1.5 S 54.848 63.223 54.02 63.223 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }} />
                                                //         <path d="M 76.935 21.529 H 62.15 c -2.616 0 -4.745 -2.128 -4.745 -4.745 V 2 c 0 -0.809 0.487 -1.538 1.234 -1.848 c 0.749 -0.31 1.607 -0.14 2.18 0.434 l 17.529 17.529 c 0.572 0.572 0.743 1.432 0.434 2.179 C 78.473 21.042 77.743 21.529 76.935 21.529 z M 61.405 6.829 v 9.956 c 0 0.411 0.334 0.745 0.745 0.745 h 9.956 L 61.405 6.829 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }} />
                                                //         <path d="M 76.935 19.529 H 62.151 c -1.516 0 -2.745 -1.229 -2.745 -2.745 V 2 L 76.935 19.529 z"
                                                //             style={{
                                                //                 fill: "rgb(196,28,28)",
                                                //                 opacity: 1,
                                                //             }} />
                                                //     </g>
                                                // </svg>
                                                <img
                                                    src={!imagePreviews.banner_creative_file.fileUrl ? imagePreviews.banner_creative_file : imagePreviews.banner_creative_file.fileUrl}
                                                    alt="Presentation File Preview"
                                                    className="w-full h-auto mt-12"
                                                />
                                            ) : (
                                                <img
                                                    src={upload}
                                                    alt="Presentation File Preview"
                                                    className="w-12 h-12 absolute top-4 lg:top-16 xl:top-24"
                                                />
                                            )}
                                            <input
                                                type="file"
                                                ref={ref}
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleFileChange(e, 'banner_creative_file')}
                                            />
                                            {!imagePreviews.banner_creative_file && (
                                                <div className="text-center absolute bottom-0 md:bottom-4  pb-2 px-1">
                                                    <div className="text-footerblue/70 text-sm md:text-base xl:text-lg">
                                                        {uploadCompanyBannerDisc}
                                                    </div>
                                                    <div className="text-footerblue/20 text-xs md:text-sm xl:text-base">
                                                        {uploadCompanyBannerSizeAdvt ? uploadCompanyBannerSizeAdvt : uploadCompanyBannerSize}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {/* Show file name if available */}
                                        {imagePreviews.banner_creative_file && (
                                            <div className="mt-2 text-footerblue/80 text-sm">
                                                {imagePreviews.banner_creative_file.fileName}
                                            </div>
                                        )}
                                    </div>
                                    {seedata && (
                                        <div className='text-right mb-20'>
                                            <a onClick={handleMechanicalData} className='underline text-footerblue' href="">
                                                See mechanical data
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='text-textblue text-sm lg:text-base'>
                                <span className='font-semibold'>{string.noteBold}</span>
                                {string.noteLine}
                            </div>
                            <div className="text-textblue">For technical assistance please contact Heera Singh 9582649664</div>
                            <div className=' flex gap-2'>
                                <button onClick={handleSubmit} className=' text-textblue border-[1px] border-textblue py-2 text-center w-full rounded-lg text-sm md:text-base xl:text-lg  '>{btn1}</button>
                                <button onClick={handleSave} className='bg-textblue text-white py-2 text-center w-full rounded-lg text-sm md:text-base xl:text-lg  '>{btn2}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default CommonPopup