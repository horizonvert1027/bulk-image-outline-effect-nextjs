"use client"
import React, { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { fabric } from 'fabric';
import { resizeImageBlob } from '@/util/commonFunctions';
import { handleDragOver, handleDragLeave, handleDrop } from '@/util/coreFunctions';
import { BTN_CONTENT } from "@/util/constants"

export default function LeftZoneComponent({
    id,
    function_type,
    function_name,
    setMessageInfo,
    resultedFileUrls = null,
    setResultedFileUrls,
    setSampleFaces,
    setBtnContent,
    isLoading,
    selectedMultipleImageFiles,
    setSelectedMultipleImageFiles, // 多图上传参数
    clearAll, // 多图上传下载清空方法
    outLineValue,
    outLineColor,
}) {
    const t = useTranslations("upload_component")
    let acceptFormats = "image/jpeg, image/png, image/webp"
    let acceptFormatsContent = "jpeg, png, webp images allowed"
    const [isDragging, setIsDragging] = useState(false)
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const colCount = 3;
    const columns = Array.from({ length: colCount }, () => []);
    selectedMultipleImageFiles.forEach((item, index) => {
        columns[index % colCount].push(item);
    });

    // 处理文件选择
    const handleMultipleFileChange = async (selectedMultipleImageFiles) => {
        let multipleFileUrls = [];
        const validFileTypes = acceptFormats.split(', ');

        for (let i = 0; i < selectedMultipleImageFiles.length; i++) {
            let file = selectedMultipleImageFiles[i];
            if (file) {
                if (!validFileTypes.includes(file.type)) {
                    setMessageInfo({
                        message: t("warn_formats"),
                        messageType: "error",
                    });
                    continue; // Ignore invalid file types
                }
                if (multipleFileUrls.length >= 20) {
                    setMessageInfo({
                        message: t("too_many_files"),
                        messageType: "info",
                    });
                    break; // Ignore extra selectedMultipleImageFiles if there are more than 20
                }
                const previewImage = await resizeImageBlob(file); // 预览图片1000px
                const originalImage = file;
                const previewImageUrl = URL.createObjectURL(previewImage); // Create a URL for the file
                const originalImageUrl = URL.createObjectURL(originalImage); // Create a URL for the file
                multipleFileUrls.push({
                    filename: file.name,
                    file: file, url: originalImageUrl, previewUrl: previewImageUrl,
                    resultUrl: null, previewResultUrl: null, taskID: null,
                    id: generateId(),
                    fabricCanvas: null,
                    containerRef: null
                });
            }
        }

        setSelectedMultipleImageFiles(multipleFileUrls);
        document.getElementById(`fileInput-${id}`).value = "";
        setResultedFileUrls(null);
        setBtnContent(BTN_CONTENT(t, function_type).original);
    };

    // 处理删除
    const handleRemoveFile = (id) => {
        const fileToRemove = selectedMultipleImageFiles.find(file => file.id === id);
        if (fileToRemove) {
            if (fileToRemove.fabricCanvas) {
                fileToRemove.fabricCanvas.dispose();
            }
        }
        setSelectedMultipleImageFiles(selectedMultipleImageFiles.filter(file => file.id !== id));
    };

    const handleDownloadFile = (id) => {
        const fileToDownload = selectedMultipleImageFiles.find(file => file.id === id);
        if (fileToDownload && fileToDownload.fabricCanvas) {
            const dataURL = fileToDownload.fabricCanvas.toDataURL({ format: 'png' });
            const link = document.createElement('a');
            link.href = dataURL;
            // link.download = fileToDownload.fileOrigin.name;
            link.download = fileToDownload.filename.split('.')[0];
            link.click();
        }
    };

    // Apply blur effect
    const applyOutlineEffect = (img, outlineValue, outlineColor) => {
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');
        const imageElement = img.getElement();
    
        canvas.width = imageElement.width + outlineValue * 2;
        canvas.height = imageElement.height + outlineValue * 2;
    
        // const offsets = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];
        const scale = outlineValue;
    
        // Draw images at offsets from the array scaled by scale
        ctx.drawImage(imageElement, canvas.width / 2, canvas.height / 2);
    
        // Fill with outline color
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = outlineColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // Draw original image in normal mode
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(imageElement, outlineValue, outlineValue);
    
        // Update the fabric image with the new canvas content
        img.setElement(canvas);
        img.applyFilters();
    };

    // 初始化 Fabric 画布
    useEffect(() => {
        selectedMultipleImageFiles.forEach(file => {
            if (!file.fabricCanvas && file.url) {
                const container = document.createElement('div');
                const canvasEl = document.createElement('canvas');
                container.appendChild(canvasEl);

                const fabricCanvas = new fabric.Canvas(canvasEl, {
                    willReadFrequently: true, // 启用频繁读取优化
                    background: '#fff'
                });

                fabric.Image.fromURL(file.previewUrl, async img => {
                    const scale = Math.min(300 / img.width, 1);
                    fabricCanvas.setWidth(img.width * scale);
                    fabricCanvas.setHeight(img.height * scale);
                    img.scale(scale);
                    img.selectable = false
                    fabricCanvas.add(img);
                });

                setSelectedMultipleImageFiles(prev =>
                    prev.map(f =>
                        f.id === file.id ? {
                            ...f,
                            fabricCanvas,
                            containerRef: container
                        } : f
                    )
                );
            }
        });
    }, [selectedMultipleImageFiles]);

    // Update blur effect when outLineValue or type changes
    useEffect(() => {
        selectedMultipleImageFiles.forEach(file => {
            if (file.fabricCanvas) {
                const img = file.fabricCanvas.getObjects('image')[0];
                if (img) {
                    applyOutlineEffect(img, outLineValue, outLineColor);
                    file.fabricCanvas.renderAll();
                }
            }
        });
    }, [outLineValue, outLineColor]);

    useEffect(() => {
        console.log(resultedFileUrls, 'resultHandle')
        if (resultedFileUrls) {
            resultedFileUrls.forEach(file => {
                fabric.Image.fromURL(file.previewResultUrl, resultImg => {
                    const img = file.fabricCanvas.getObjects('image')[0]
                    resultImg.scale(img.scaleX);
                    file.fabricCanvas.add(resultImg);
                    resultImg.moveTo(1); // Ensure the result image is on top
                });
            })
        }
    }, [resultedFileUrls])

    const handleDownloadImage = async (url, filename = resultedFileName) => {
        try {
            if (bgRemoverBackgroundColor != null) {
                console.log(`==background=`, bgRemoverBackgroundColor)
                url = await drawImageWithBackground(url, bgRemoverBackgroundColor)
            }
            const response = await fetch(url)
            if (!response.ok) throw new Error("Network response was not ok.")
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = downloadUrl
            // const filename = url.split('/').pop() || 'downloaded-image';
            console.log(filename, "filename")
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(downloadUrl) // Clean up the URL object
        } catch (error) {
            console.error("Download failed:", error)
        }
    }

    const handleRemoveFromMultipleImages = (index) => {
        setSelectedMultipleImageFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            if (updatedFiles.length === 0) {
                clearAll();
            }
            return updatedFiles;
        });
    };

    const renderMultipleEditButton = (index) => {
        return (
            <div className="inline-flex absolute top-2 right-2 z-10 gap-x-2">
                {resultedFileUrls && (
                    <button
                        className="p-2 bg-neutral-100/[0.8] hover:bg-neutral-200 dark:bg-neutral-700 hover:dark:bg-neutral-800 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDownloadImage(selectedMultipleImageFiles[index].resultUrl, selectedMultipleImageFiles[index].filename)
                        }}
                        disabled={isLoading}
                    >
                        download
                    </button>
                )}
                <button
                    className="p-2 bg-neutral-100/[0.8] hover:bg-neutral-200 dark:bg-neutral-700 hover:dark:bg-neutral-800 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFromMultipleImages(index)
                    }}
                    disabled={isLoading}
                >
                    delete
                </button>
            </div>
        )
    }

    const renderMultipleImagesUploadDisplay = (
        <div
            className={`w-full h-full flex flex-col min-h-[160px] items-center mx-auto cursor-pointer
            ${isDragging ? "border-4 border-accent border-dashed" : ""}`}
            onDragOver={(e) => handleDragOver(e, setIsDragging)}
            onDragLeave={(e) => handleDragLeave(e, setIsDragging)}
            onDrop={(e) => handleDrop(e, setIsDragging, function_type, handleMultipleFileChange)}
            onClick={() => document.getElementById(`fileInput-${id}`).click()}
        >
            <input
                type="file"
                id={`fileInput-${id}`}
                onChange={(e) => handleMultipleFileChange(e.target.files)}
                style={{ display: "none" }}
                accept={acceptFormats}
                multiple={true}
                disabled={isLoading || resultedFileUrls}
            />

            {selectedMultipleImageFiles != null && selectedMultipleImageFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {columns.map((colItems, colIndex) => (
                        <div key={colIndex} className="w-full h-full gap-y-2 flex flex-wrap items-top content-start justify-center">
                            {colItems.map((file, index) => (
                                <div key={index} className="relative">
                                    <div
                                        key={file.id}
                                        className="relative flex flex-col justify-center items-center w-full rounded-lg border border-neutral-100 dark:border-neutral-700"
                                        // style={{ width: '300px' }}
                                        ref={el => {
                                            // 将容器挂载到 DOM
                                            if (el && file.containerRef && !el.contains(file.containerRef)) {
                                                el.appendChild(file.containerRef);
                                            }
                                        }}
                                    >

                                    </div>
                                    {renderMultipleEditButton(index)}
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            ) : (

                <div className="h-full flex flex-col justify-center items-center">
                    <div>
                        <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent bg-amber-300 dark:bg-violet-600 text-black dark:text-white font-semibold hover:bg-amber-400 dark:hover:bg-violet-700 disabled:opacity-50 disabled:pointer-events-none">
                            <div className="inline-flex items-center justify-center gap-x-2">
                                
                                Upload your images
                            </div>
                        </button>
                        <p className="font-semibold text-sm mt-4 ">{t("drag")}</p>
                        <p className="text-xs opacity-80">{acceptFormatsContent}</p>
                        <div className="mt-8">
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                {t("no_picture")}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="relative h-full">
            {renderMultipleImagesUploadDisplay}
        </div>

    );
}