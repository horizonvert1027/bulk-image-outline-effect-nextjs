/*
 * @Author: wzp 623301600@qq.com
 * @Date: 2024-10-23 21:48:43
 * @LastEditors: wzp 623301600@qq.com
 * @LastEditTime: 2024-10-28 21:44:08
 * @FilePath: /swapanything-nextjs/src/util/commonFunctions.js
 * @Description:
 *
 */
/*/////////////////////////////////////////////////////////////
  This file contains common functions used in the application.
*/ ////////////////////////////////////////////////////////////

import { MAX_SIZE } from "./constants"

// Check the file size before uploading
export const checkFileSize = (file) => {
    const size = file.size / 1024 / 1024
    if (size > 10) {
        return false
    }
    return true
}

// Function used to resize and compress image to jpg format
export async function processImage(file, userType, functionType) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        let maxSize = MAX_SIZE
        img.src = URL.createObjectURL(file)
        img.onload = () => {
            let width = img.width
            let height = img.height
            // if (userType == "N/A" || userType == "Free Account") {
            //     maxSize = 800
            // }
            maxSize = 800 // for now, all users will have the same size
            if (functionType == 3) {
                maxSize = 3000
            }
            console.log("Original image size:", width, height)
            console.log("userType, Max Size:", userType, maxSize)

            // Check if the image needs resizing
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height *= maxSize / width
                    width = maxSize
                } else {
                    width *= maxSize / height
                    height = maxSize
                }
            }

            // Create canvas
            const canvas = document.createElement("canvas")
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")
            ctx.drawImage(img, 0, 0, width, height)

            // Check for transparency
            let hasTransparency = false
            const imageData = ctx.getImageData(0, 0, width, height).data
            for (let i = 0; i < imageData.length; i += 4) {
                if (imageData[i + 3] < 255) {
                    hasTransparency = true
                    break
                }
            }

            // Convert to JPEG or keep PNG if transparent
            const outputFormat = hasTransparency ? "image/png" : "image/jpeg"
            canvas.toBlob((blob) => {
                if (blob) {
                    const processedFile = new File([blob], file.name, {
                        type: outputFormat,
                        lastModified: Date.now(),
                    })
                    resolve(processedFile)
                    console.log("Image processing successful")
                    const fileSizeInMB = processedFile.size / (1024 * 1024)
                    console.log(`File size: ${fileSizeInMB.toFixed(2)} MB`)
                } else {
                    console.log("Image processing failed")
                    reject(new Error("Image processing failed"))
                }
            }, outputFormat)
        }
        img.onerror = (error) => reject(error)
    })
}

export function resizeImageBlob(file, toJPG = false) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            const maxSize = 1000;

            // Check if the image needs resizing
            if (width > maxSize || height > maxSize) {
                if (width > height) {
                    height *= maxSize / width;
                    width = maxSize;
                } else {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }

            // Create canvas
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to JPEG or keep original format
            const outputFormat = toJPG ? "image/jpeg" : file.type;
            canvas.toBlob((blob) => {
                if (blob) {
                    const resizedFile = new File([blob], file.name, {
                        type: outputFormat,
                        lastModified: Date.now(),
                    });
                    resolve(resizedFile);
                } else {
                    reject(new Error("Image resizing failed"));
                }
            }, outputFormat);
        };
        img.onerror = (error) => reject(error);
    });
}

/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {cb}
 */
export function getBlob(url, cb) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.onload = function () {
        if (xhr.status === 200) {
            cb(xhr.response)
        }
    }
    xhr.send()
}

/**
 * 保存
 * @param  {Blob|string} blob
 * @param  {String} filename 想要保存的文件名称
 */
export function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
    } else {
        var link = document.createElement("a")
        var body = document.querySelector("body")

        if (blob instanceof Blob) {
            link.href = window.URL.createObjectURL(blob)
        } else {
            link.href = blob
        }

        // link.href = window.URL.createObjectURL(blob);
        link.download = filename

        // fix Firefox
        link.style.display = "none"
        body.appendChild(link)

        link.click()
        body.removeChild(link)

        window.URL.revokeObjectURL(link.href)
    }
}

/**
 * 新版的检查图片，同时回转blob(历史中使用)  建议吧旧版的检查也保留  万一不行再改回吧
 * @param {} imgUrl
 * @returns
 */

export function checkImage(imgUrl) {
    return new Promise(async function (resolve) {
        try {
            const response = await fetch(imgUrl)
            if (response.ok) {
                const processResBlob = await response.blob()
                let picOrigin = imgUrl.split("?")[0]

                let res = {
                    processResBlob,
                    isAvailable: true,
                    imageUrl: URL.createObjectURL(processResBlob),
                    imgName: picOrigin.substring(
                        picOrigin.lastIndexOf("/") + 1,
                        picOrigin.length
                    ),
                    imgUrl: imgUrl,
                }

                resolve(res)
            } else {
                resolve({ imgUrl, isAvailable: false })
            }
        } catch (error) {
            console.log(`==错误了==`, error)

            resolve({ imgUrl, isAvailable: false })
        }
    })
}

export function checkImages(imgArr) {
    let promises = imgArr.map(checkImage)
    return Promise.all(promises)
}

export function blob2File(src) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET", src, true)
        xhr.responseType = "blob"
        xhr.onload = function (e) {
            if (this.status == 200) {
                let myBlob = this.response
                let files = new window.File([myBlob], myBlob.type, {
                    type: myBlob.type,
                }) // myBlob.type 自定义文件名
                resolve(files)
            } else {
                reject(false)
            }
        }
        xhr.send()
    })
}

export function getMemberType(userType) {
    if (userType == "N/A") {
        return 0
    }
    else if (userType == "Free Account") {
        return 1
    }
    else if (userType == "Monthly Plan") {
        return 2
    }
    else if (userType == "Yearly Plan") {
        return 3
    }
    else if (userType == "Lifetime Plan") {
        return 4
    }
    else if (userType == "Paid Member") {
        return 5
    }
}

// base64 提示词
export function encryptPrompts(text){
    return Buffer.from(text).toString('base64');
}

export function decryptPrompts(ciphertext){
    return Buffer.from(ciphertext, 'base64').toString('utf-8');
};
