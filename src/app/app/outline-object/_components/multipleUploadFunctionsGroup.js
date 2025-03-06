"use client"
import React, { useRef, useState, useEffect } from "react"
import LeftZoneComponent from "./leftZoneComponents"
import RightZoneBackgroundRemover from "./rightZoneBackgroundRemover"
import JSZip from "jszip";
import { useTranslations } from "next-intl"
import MessageToast from "@/components/messageToast"
import { BTN_CONTENT } from "@/util/constants"
import { saveAs } from "@/util/commonFunctions"
import { applyOutlineEffectToRawImage } from "@/util/ImageCompress";


const FunctionsGroup = ({ function_type, function_name, slug = "", defaultImageList = null }) => {
    const t = useTranslations("upload_component")
    const [displayTrustPilot, setDisplayTrustPilot] = useState(false)

    // default parameters used for DropZoneComponent
    const [uploadImageId, setUploadImageId] = useState("")
    const [isNsfw, setIsNsfw] = useState(false)
    const [selectedMultipleImageFiles, setSelectedMultipleImageFiles] = useState([]);  // { file: null, url: null, filename: null, resultUrl: null },
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [btnContent, setBtnContent] = useState(BTN_CONTENT(t).blurBackground) // uploading process 1-100
    const [historyListViewEnabled, setHistoryListViewEnabled] = useState(false)
    const [resultedFileName, setResultedFileName] = useState("")
    const [results, setResults] = useState(null)
    const [uploadTaskID, setUploadTaskId] = useState("")
    const resultBlob = useRef(null)
    const checkStatusCounter = useRef(0)
    const [bgRemoverBackgroundColor, setBgRemoverBackgroundColor] = useState(null)
    const [outLineValue, setOutLineValue] = useState(0)
    const [outLineColor, setOutLineColor] = useState('#f5d565')
    /////////////////////////////////////////////////

    const [messageInfo, setMessageInfo] = useState({
        message: "",
        messageType: "",
    })
    const clearMessage = () => setMessageInfo("") // Clear message


    const renderRightEditZone = (function_name) => {
        switch (function_name) {
            case 'blur_background':
                return <RightZoneBackgroundRemover outLineValue={outLineValue} setOutLineValue={setOutLineValue} outLineColor={outLineColor} setOutLineColor={setOutLineColor} />;
            default:
                return null;
        }
    };



    const downloadZipAll = async () => {
        setBtnContent(BTN_CONTENT(t).processing);
        const zip = new JSZip();
        const folder = zip.folder("vheer_bg_remover");
    
        // Process all images in parallel
        const imageProcessingPromises = selectedMultipleImageFiles.map(file =>
            applyOutlineEffectToRawImage(file, outLineValue, outLineColor)
        );
    
        const processedImages = await Promise.all(imageProcessingPromises);
    
        // Add images to ZIP folder
        processedImages.forEach(({ filename, imgData }) => {
            folder.file(filename, imgData.split(",")[1], { base64: true });
        });
    
        // Generate and download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, "vheer_bg_remover.zip");
            setBtnContent(BTN_CONTENT(t).download);
        });
    };

    const clearAll = () => {
        setResults(null);
        setUploadImageId("");
        setIsLoading(false);
        setIsUploading(false);
        setBtnContent(BTN_CONTENT(t).blurBackground);
        setHistoryListViewEnabled(false);
        setUploadTaskId("");
        setDisplayTrustPilot(false);
        setSelectedMultipleImageFiles([]);
        checkStatusCounter.current = 0;
    }

    const handleClickFileUploadBtn = () => {
            document.getElementById(`fileInput-1`).click();
    }
    return (
        <>
            {messageInfo.message && <MessageToast messageInfo={messageInfo} clearMessage={clearMessage} />}
            <div className="flex flex-col">
                {/* {userType.userType == "N/A" && <Ads101 />} */}
                <div className="mx-auto inline-flex w-full">
                    {/* {userType.userType == "N/A" && <Ads104 />} */}
                    <div className="flex flex-col md:flex-row gap-4 mx-auto w-full md:h-[640px]">
                        <div className="min-h-[400px] h-[460px] md:h-full lg:w-[940px] bg-white dark:bg-neutral-800 overflow-y-auto overflow-x-auto rounded-lg">
                            <LeftZoneComponent
                                id={1}
                                function_type={function_type}
                                resultedFileUrls={results}
                                setResultedFileUrls={setResults}
                                setBtnContent={setBtnContent}
                                setMessageInfo={setMessageInfo}
                                selectedMultipleImageFiles={selectedMultipleImageFiles}
                                setSelectedMultipleImageFiles={setSelectedMultipleImageFiles}
                                clearAll={clearAll}
                                outLineValue={outLineValue} 
                                outLineColor={outLineColor}/>
                        </div>
                        <div className="relative md:flex-1 h-[320px] bg-accent/90 pl-3 h-full rounded-lg flex flex-col justify-between bg-white dark:bg-neutral-800">
                            <div className="flex flex-col pr-2 h-full">
                                {renderRightEditZone(function_name)}
                            </div>
                            <div className="py-4 pr-3">
                                { selectedMultipleImageFiles.length > 0 && (
                                    <button onClick={() => handleClickFileUploadBtn()} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-300 dark:bg-violet-600 text-black dark:text-white font-semibold hover:bg-amber-400 dark:hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none mb-2">
                                        <div className="inline-flex items-center justify-center tracking-wide font-semibold">Upload More Images</div>
                                    </button>
                                )}
                                <button disabled={isLoading || selectedMultipleImageFiles.length == 0} onClick={() => downloadZipAll()} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-300 dark:bg-violet-600 text-black dark:text-white font-semibold hover:bg-amber-400 dark:hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none">
                                    <div className="inline-flex items-center justify-center tracking-wide font-semibold">{btnContent}</div>
                                </button>
                                <button disabled={isLoading} onClick={() => clearAll()} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs hover:opacity-80 text-neutral-800 dark:text-neutral-400 font-semibold disabled:opacity-50 disabled:pointer-events-none">
                                    <div className="inline-flex items-center justify-center tracking-wide font-semibold">Clear all</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FunctionsGroup
