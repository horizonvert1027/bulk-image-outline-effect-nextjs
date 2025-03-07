"use client"
import React, { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { fabric } from 'fabric';
import { resizeImageBlob } from '@/util/commonFunctions';
import { handleDragOver, handleDragLeave, handleDrop } from '@/util/coreFunctions';
import { BTN_CONTENT } from "@/util/constants"
import { applyOutlineEffectToRawImage, getImageOutline } from "@/util/ImageCompress";

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
    const [replaceId, setReplaceId] = useState(null);
    const generateId = () => Math.random().toString(36).substr(2, 9);

    const colCount = 3;
    const columns = Array.from({ length: colCount }, () => []);
    selectedMultipleImageFiles.forEach((item, index) => {
        columns[index % colCount].push(item);
    });

    const maxOutlineValue = 20;
    // 处理文件选择
    const handleMultipleFileChange = async (files, replaceFileId = null) => {
        let multipleFileUrls = [];
        const validFileTypes = acceptFormats.split(', ');

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
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
                    break; // Ignore extra files if there are more than 20
                }
                const previewImage = await resizeImageBlob(file); // 预览图片1000px
                const imageOutline = await getImageOutline(previewImage); // Get Outline path from the preview image
                
                const originalImage = file;
                const previewImageUrl = URL.createObjectURL(previewImage); // Create a URL for the file
                const originalImageUrl = URL.createObjectURL(originalImage); // Create a URL for the file
                const data = {
                    filename: file.name,
                    file: file, 
                    url: originalImageUrl, 
                    previewUrl: previewImageUrl,
                    resultUrl: null, 
                    previewResultUrl: null,
                    outlines: imageOutline,
                    taskID: null,
                    id: replaceFileId || generateId(),
                    fabricCanvas: null,
                    containerRef: null
                };
                if (replaceFileId) {
                    const index = selectedMultipleImageFiles.findIndex(_ => _.id == replaceFileId);
                    if (index != -1) {
                        selectedMultipleImageFiles[index] = data;
                    }
                } else {
                    multipleFileUrls.push(data);
                }
            }
        }

        setSelectedMultipleImageFiles([...selectedMultipleImageFiles, ...multipleFileUrls]);
        document.getElementById(`fileInput-${id}`).value = "";
        setResultedFileUrls(null);
        setBtnContent(BTN_CONTENT(t, function_type).download);
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
    const applyOutlineEffect = (file, outlineValue, outlineColor) => {
        console.log('applyOutlineEffect')
        const img = file.fabricCanvas.getObjects('image')[0];

        // Remove all outline polyline
        file.fabricCanvas.getObjects().forEach(obj => {
            if (obj.dataId == 'outlineEffect') {
                file.fabricCanvas.remove(obj);
            }
        })

        let scale = Math.min((300 - maxOutlineValue * 2) / img.width, 1);
        if (img.height > img.width) {
            scale = Math.min((300 - maxOutlineValue * 2) / img.height, 1);
        }
        if (file.outlines) {
            file.outlines.forEach(outlinePath => {
                const outline = new fabric.Polyline(outlinePath, {
                    stroke: outLineColor || 'red',
                    strokeWidth: outlineValue * 2,
                    fill: '', // No fill
                    selectable: false,
                    evented: false,
                    objectCaching: false,
                    strokeLineCap: 'round', // Round line caps
                    strokeLineJoin: 'round', // Rounded corners
                    originX: 'center',
                    originY: 'center',
                    dataId: 'outlineEffect'
                });
                outline.set({
                    left: outline.left * scale + 18 + (260 - img.width * scale) / 2, 
                    top: outline.top * scale + 18 + (260 - img.height * scale) / 2
                });
                outline.scale(scale);
                file.fabricCanvas.add(outline);
                file.fabricCanvas.sendToBack(outline);
            });
        }
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
                    let scale = Math.min((300 - maxOutlineValue * 2) / img.width, 1);
                    if (img.height > img.width) {
                        scale = Math.min((300 - maxOutlineValue * 2) / img.height, 1);
                    }

                    fabricCanvas.setWidth(300);
                    fabricCanvas.setHeight(300);
                    img.set({
                        // stroke: 'gray',
                        // strokeWidth: 1,
                        left: img.left  + maxOutlineValue + (300 - maxOutlineValue * 2) / 2, 
                        top: img.top  + maxOutlineValue + (300 - maxOutlineValue * 2) / 2,
                        id: 'outlineImage',
                        originX: 'center', 
                        originY: 'center'
                    });
                    img.scale(scale);
                    img.selectable = false
                    fabricCanvas.add(img);

                    const dottedRect = new fabric.Rect({
                        left: maxOutlineValue,      
                        top: maxOutlineValue,       
                        width: 300 - maxOutlineValue * 2,    
                        height: 300 - maxOutlineValue * 2,   
                        fill: '',      
                        stroke: 'lightgray',
                        strokeWidth: 1,
                        strokeDashArray: [10, 5],
                        selectable: false,
                        evented: false
                    });
                    
                    // Add the rectangle to the canvas
                    fabricCanvas.add(dottedRect);
                    
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
                if (img && file.outlines) {
                    applyOutlineEffect(file, outLineValue, outLineColor);
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

    const handleDownloadImage = async (file) => {
        try {
            const img = await applyOutlineEffectToRawImage(file, outLineValue, outLineColor)
            // Create a download link
            const downloadLink = document.createElement("a");
            downloadLink.href = img.imgData;
            downloadLink.download = `${img.filename || "download"}.png`; // Set file name
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); // Cleanup
        } catch (error) {
            console.error("Download failed:", error)
        }
    }

    const handleRemoveFromMultipleImages = (fid) => {
        setSelectedMultipleImageFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => _.id !== fid);
            if (updatedFiles.length === 0) {
                clearAll();
            }
            return updatedFiles;
        });
    };

    const handleReplaceImage = (fid) => {
        setReplaceId(fid);
        document.getElementById(`fileInput-${id}-replace`).click()
    }

    const renderMultipleEditButton = (file) => {
        return (
            <div className="inline-flex absolute top-2 right-2 z-10 gap-x-2">
                <button
                    className="p-2 bg-neutral-100/[0.8] hover:bg-neutral-200 dark:bg-neutral-700 hover:dark:bg-neutral-800 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadImage(file)
                    }}
                    disabled={isLoading}
                >
                    download
                </button>
                <button
                    className="p-2 bg-neutral-100/[0.8] hover:bg-neutral-200 dark:bg-neutral-700 hover:dark:bg-neutral-800 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleReplaceImage(file.id)
                    }}
                    disabled={isLoading}
                >
                    Replace
                </button>
                <button
                    className="p-2 bg-neutral-100/[0.8] hover:bg-neutral-200 dark:bg-neutral-700 hover:dark:bg-neutral-800 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFromMultipleImages(file.id)
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
            onClick={() => selectedMultipleImageFiles.length == 0 && document.getElementById(`fileInput-${id}`).click()}
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
            <input
                type="file"
                id={`fileInput-${id}-replace`}
                onChange={(e) => handleMultipleFileChange(e.target.files, replaceId)}
                style={{ display: "none" }}
                accept={acceptFormats}
                disabled={isLoading || resultedFileUrls}
            />

            {selectedMultipleImageFiles != null && selectedMultipleImageFiles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {columns.map((colItems, colIndex) => (
                        <div key={colIndex} className="w-full h-full gap-y-2 flex flex-wrap items-top content-start justify-center">
                            {colItems.map((file, index) => (
                                <div key={index} className="relative" data-test={colIndex}>
                                    <div
                                        key={file.id}
                                        className="relative flex flex-col justify-center items-center w-full rounded-lg border border-neutral-300 dark:border-neutral-700"
                                        // style={{ width: '300px' }}
                                        ref={el => {
                                            // 将容器挂载到 DOM
                                            if (el && file.containerRef && !el.contains(file.containerRef)) {
                                                // Check if there is an existing child
                                                if (el.firstChild) {
                                                    el.replaceChild(file.containerRef, el.firstChild);
                                                } else {
                                                    el.appendChild(file.containerRef); // If no child exists, append new one
                                                }                                                
                                            }
                                        }}
                                    >

                                    </div>
                                    {renderMultipleEditButton(file)}
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