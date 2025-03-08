/*
 * @Author: wzp 623301600@qq.com
 * @Date: 2023-05-10 23:39:50
 * @LastEditors: wzp 623301600@qq.com
 * @LastEditTime: 2024-10-28 21:56:37
 * @LastEditors: Volo success.together0303@gmail.com
 * @LastEditTime: 2025-03-08 21:56:37
 * @FilePath: /swapanything-nextjs/src/util/ImageCompress.js
 * @Description:
 *
 */

/**
 * Blob/file生成临时url   用于显示
 * @param {*} file
 * @returns
 */
function createObjectURL(file) {
    if (window.webkitURL) {
        //// basic
        return window.webkitURL.createObjectURL(file)
    } else if (window.URL && window.URl.createObjectURL) {
        return window.URl.createObjectURL(file)
    } else if (window.webkitURL) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(imgBlob)
    } else {
        return null
    }
}
/**
 * 判断图片是否需要压缩处理，最终都以jpg呈现
 * @param {*} fileRaw ：图片文件
 * @param {*} originalFile ：上传的file对象
 */

export function getCompressParams(width, height, maxScale = 800) {
    let obj = {}
    if (width > maxScale && width >= height) {
        console.log(`第一个压缩`)

        obj = {
            width: maxScale,
            quality: 1,
        }
    } else if (height > maxScale && height > width) {
        console.log(`第2个压缩`)
        obj = {
            height: maxScale,
            quality: 1,
        }
    } else {
        console.log(`不处理`)

        return [width, height]
    }

    var w = width,
        h = height,
        scale = w / h

    w = obj.width || obj.height * scale
    h = obj.height || obj.width / scale

    return [w, h]
}

/**
 * 压缩，以blob的形式呈现,这里提前知道了是jpg，因为脸处理完已经转成了jpg
 * @param {*} originalFile 原图片的base64
 * @param {*} maxScale
 * @returns
 */
export async function getImg(originalFile, maxScale = 800) {
    return new Promise((resolve, reject) => {
        let image = new Image()
        image.src = originalFile

        image.onload = async function (event) {
            let width = image.width
            let height = image.height

            if (width > maxScale && width >= height) {
                console.log(`第一个压缩`)

                deal2Comparess(
                    image,
                    {
                        width: maxScale,
                        quality: 1,
                    },
                    function (imgBlob) {
                        resolve(imgBlob)
                        // tr.$forceUpdate();
                    }
                )
            } else if (height > maxScale && height > width) {
                console.log(`第2个压缩`)

                deal2Comparess(
                    image,
                    {
                        height: maxScale,
                        quality: 1,
                    },
                    function (base) {
                        resolve(imgBlob)
                    }
                )
            } else {
                console.log(`不处理`)

                // 无需处理，返回图片url
                let url = ""

                // if (!originalFile.type.includes("jpeg") && !originalFile.type.includes("jpg")) {

                var canvas = document.createElement("canvas")

                canvas.width = width ? width : image.width

                canvas.height = height ? height : image.height

                var ctx = canvas.getContext("2d")

                var quality = 1 // 默认图片质量为0.7

                ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

                canvas.toBlob(
                    (blob) => {
                        resolve(blob)
                    },
                    "image/jpeg",
                    quality
                )
                // } else {
                //     // url = await getFileBase64(originalFile)//不需要压缩的转base64 之前版本，现在不需要了
                //     url = createObjectURL(originalFile)
                // }

                // tr.$forceUpdate();
            }
        }
    })
}

// 压缩处理图片
export function deal2Comparess(image, obj, callback) {
    // 默认按比例压缩
    var w = image.width,
        h = image.height,
        scale = w / h
    w = obj.width || obj.height * scale
    h = obj.height || obj.width / scale
    var quality = 0.7 // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d")
    // 创建属性节点
    var anw = document.createAttribute("width")
    anw.nodeValue = w
    var anh = document.createAttribute("height")
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(image, 0, 0, w, h)
    // that.imgOriginWidth = w;
    // that.imgOriginHeight = h;
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    canvas.toBlob(
        (blob) => {
            callback(blob)
        },
        "image/jpeg",
        quality
    )
}

export async function getImg2(originalFile, maxScale = 3000) {
    let reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.readAsDataURL(originalFile)

        reader.onload = async function (event) {
            let imageSrc = event.target.result
            let image = new Image()
            image.src = event.target.result
            image.onload = async function () {
                let width = image.width
                let height = image.height
                if (width > maxScale && width >= height) {
                    console.log(`B图 第一个压缩`)

                    await dealImage(
                        imageSrc,
                        {
                            width: maxScale,
                            quality: 1,
                        },
                        function (base) {
                            // originalFile.imgUrl = base;//改为blob

                            let imgBlob = dataURLtoBlob(base)
                            originalFile.imgUrl = imgBlob

                            resolve(originalFile)
                            // tr.$forceUpdate();
                        }
                    )
                } else if (height > maxScale && height > width) {
                    console.log(`B图 第2个压缩`)

                    await dealImage(
                        imageSrc,
                        {
                            height: maxScale,
                            quality: 1,
                        },
                        function (base) {
                            // originalFile.imgUrl = base;

                            let imgBlob = dataURLtoBlob(base)
                            originalFile.imgUrl = imgBlob
                            // tr.$forceUpdate();
                            resolve(originalFile)
                        }
                    )
                } else {
                    console.log(`B图 bu压缩`)

                    // 无需处理，返回图片url
                    let url = ""

                    if (
                        !originalFile.type.includes("jpeg") &&
                        !originalFile.type.includes("jpg")
                    ) {
                        var canvas = document.createElement("canvas")

                        canvas.width = width ? width : img.width

                        canvas.height = height ? height : img.height

                        var ctx = canvas.getContext("2d")

                        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

                        let imgBase64 = canvas.toDataURL("image/jpeg")

                        let imgBlob = dataURLtoBlob(imgBase64)
                        url = imgBlob
                    } else {
                        // url = await getFileBase64(originalFile)//不需要压缩的转base64 之前版本，现在不需要了
                        url = createObjectURL(originalFile)
                    }

                    originalFile.imgUrl = url
                    resolve(originalFile)
                    // tr.$forceUpdate();
                }
            }
        }
    })
}
// 压缩处理图片
export async function dealImage(path, obj, callback) {
    var img = new Image()
    img.src = path
    img.onload = await function () {
        var that = this
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h
        w = obj.width || obj.height * scale
        h = obj.height || obj.width / scale
        var quality = 0.7 // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext("2d")
        // 创建属性节点
        var anw = document.createAttribute("width")
        anw.nodeValue = w
        var anh = document.createAttribute("height")
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // that.imgOriginWidth = w;
        // that.imgOriginHeight = h;
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality)
        // 回调函数返回base64的值
        callback(base64)
    }
}

// 将base6图4片转换为file以上传(base64--->file)
export function dataURLtoFile(dataurl, name) {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], name, {
        type: mime,
    })
}

// 将压缩后的图片转换为blob
export function dataURLtoBlob(dataBase64) {
    var arr = dataBase64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    let imgBlob = new Blob([u8arr], {
        type: mime,
    })

    return createObjectURL(imgBlob)
}

// Blob/file生成临时url
// function createPreviewUrl(imgBlob) {
//     let url = "";
//     if (window.createObjectURL !== undefined) {
//         // basic
//         url = window.createObjectURL(imgBlob);
//     } else if (window.URL !== undefined) {
//         // mozilla(firefox)
//         url = window.URL.createObjectURL(imgBlob);
//     } else if (window.webkitURL !== undefined) {
//         // webkit or chrome
//         url = window.webkitURL.createObjectURL(imgBlob);
//     }
//     return url
// }

//203
export function checkImageWithProgress(imgUrl, signal, onProgress, fileSize) {
    if (onProgress) {
        onProgress(0)
    }
    return new Promise(async function (resolve, reject) {
        try {
            const response = await fetch(imgUrl, { signal })
            if (response.ok) {
                // const processResBlob = await response.blob();
                console.log(`=获取下载=`, response)

                if (!response.ok) {
                    reject({ imgUrl, isAvailable: false })
                }

                const reader = response.body.getReader()
                // const contentLength = response.headers.get("Content-Length") 在next中发现值是null在nuxt能取到
                const contentLength = fileSize
                let receivedLength = 0 // 接收到的字节数
                let chunks = [] // 用于存储二进制块的数组

                // 读取数据
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) {
                        break
                    }
                    chunks.push(value)
                    receivedLength += value.length

                    // 调用 onProgress 回调函数
                    if (onProgress) {
                        let p = receivedLength / contentLength
                        // console.log(
                        //     `==下载监听=`,
                        //     `---${receivedLength}--${contentLength}--`
                        // )
                        let cp = Math.round(p * 100)
                        onProgress(cp)
                    }
                }

                let picOrigin = imgUrl.split("?")[0]

                // 将所有块合并成一个 Uint8Array
                let chunksAll = new Uint8Array(receivedLength)
                let position = 0
                for (let chunk of chunks) {
                    chunksAll.set(chunk, position)
                    position += chunk.length
                }

                // 创建一个 Blob 并返回 URL
                const processResBlob = new Blob([chunksAll])

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
            //   console.log(`==错误了==`, error);

            resolve({ imgUrl, isAvailable: false })
        }
    })
}

export function base64ToFile(base64String, filename = "file", mimeType = "") {
    // 去掉 Base64 字符串的前缀（例如：data:image/png;base64,）
    const parts = base64String.split(";base64,")
    const contentType = parts[0].split(":")[1]
    const byteCharacters = atob(parts[1])

    // 创建一个 ArrayBuffer 来存储二进制数据
    const arrayBuffer = new ArrayBuffer(byteCharacters.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    // 将每个字符转换为对应的字节
    for (let i = 0; i < byteCharacters.length; i++) {
        uint8Array[i] = byteCharacters.charCodeAt(i)
    }

    // 使用 File 构造函数创建 File 对象
    return new File([arrayBuffer], filename, { type: contentType || mimeType })
}

//   // 示例用法
//   const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'; // 你的 Base64 字符串
//   const file = base64ToFile(base64String, 'example.png', 'image/png');

//   console.log(file); // 输出 File 对象


// get outline from image
function getIndex(x, y, width) {
    return (y * width + x) * 4; // Each pixel has RGBA channels
}

function isOpaque(imageData, x, y, width, height) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    return imageData.data[getIndex(x, y, width) + 3] > 10; // Alpha > 10 means non-transparent
}

function findConnectedComponents(imageData, width, height) {
    const visited = new Array(width * height).fill(false);
    const objects = [];

    function floodFill(x, y, points) {
        const stack = [[x, y]];
        while (stack.length > 0) {
            const [cx, cy] = stack.pop();
            const index = cy * width + cx;
            if (visited[index] || !isOpaque(imageData, cx, cy, width, height)) continue;

            visited[index] = true;
            points.push({ x: cx, y: cy });

            // Check 4-way neighbors
            stack.push([cx + 1, cy]);
            stack.push([cx - 1, cy]);
            stack.push([cx, cy + 1]);
            stack.push([cx, cy - 1]);
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            if (!visited[index] && isOpaque(imageData, x, y, width, height)) {
                const points = [];
                floodFill(x, y, points);
                if (points && points.length > 150) {
                    objects.push(points);
                }
            }
        }
    }

    return objects;
}

function traceOutline(imageData, objectPoints, width, height) {
    const visited = new Set();
    const directions = [
        [1, 0], [0, 1], [-1, 0], [0, -1],
        [1, 1], [-1, 1], [-1, -1], [1, -1]
    ];

    let outline = [];

    function isEdgePixel(x, y) {
        if (!isOpaque(imageData, x, y, width, height)) return false;
        return directions.some(([dx, dy]) => !isOpaque(imageData, x + dx, y + dy, width, height));
    }

    const edgePixels = objectPoints.filter(({ x, y }) => isEdgePixel(x, y));

    if (edgePixels.length === 0) return [];

    let startX = edgePixels[0].x, startY = edgePixels[0].y;
    let x = startX, y = startY;
    let first = true;
    let loopCount = 0;

    while (true) {
        outline.push({ x, y });
        visited.add(`${x},${y}`);

        let foundNext = false;

        outerLoop:
        for (let i = 0; i < 50; i++) {
            // Loop The 8-way search if the outline cut off
            if (!foundNext) {
                if (i > 0) {
                    const xy = outline.pop();
                    if (!xy) break;
                    x = xy.x; y = xy.y;
                }
                for (const [dx, dy] of directions) {
                    const nx = x + dx, ny = y + dy;
                    if (isEdgePixel(nx, ny) && !visited.has(`${nx},${ny}`)) {
                        x = nx;
                        y = ny;
                        foundNext = true;
                        break outerLoop;
                    }
                    if (Math.abs(startX - nx) < 2 && Math.abs(startY - ny) < 2 && loopCount > 25) {
                        // console.log('end - start', nx, ny, startX, startY)
                        break outerLoop;
                    }
                }
            }
        }

        loopCount++;
        if (loopCount > edgePixels.length * 2) break; // Safety check to avoid infinite loops

        if (!foundNext) break; // If no next edge pixel is found, stop tracing

        if (!first && x === startX && y === startY) break; // Stop when we complete the loop
        first = false;
    }

    return outline;
}

export function getImageOutline(file) {
    return new Promise((resolve, reject) => {
        const objectURL = URL.createObjectURL(file);
        fabric.Image.fromURL(objectURL, function (img) {
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
        
            tempCanvas.width = img.width + 10;
            tempCanvas.height = img.height + 10;
        
            ctx.drawImage(img.getElement(), 5, 5);
            const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        
            // Detect separate objects
            const objects = findConnectedComponents(imageData, tempCanvas.width, tempCanvas.height);
            // console.log(objects)
            console.log(`Found ${objects.length} separate objects`);
        
            const outlines = objects.map(points => {
                return traceOutline(imageData, points, tempCanvas.width, tempCanvas.height);
            });
        
            // Clean up object URL
            URL.revokeObjectURL(objectURL);

            resolve(outlines);
        })
    })

}

export function applyOutlineEffectToRawImage(file, outLineValue, outLineColor) {
    return new Promise((resolve, reject) => {
        const url = file.url;
        const outlines = file.outlines;
        const maxOutlineValue = outLineValue * 1;
        fabric.Image.fromURL(url, function (img) {
            // Create an offscreen canvas
            const canvasEl = document.createElement("canvas");
            canvasEl.width = img.width + maxOutlineValue * 2;
            canvasEl.height = img.height + maxOutlineValue * 2;

            const fabricCanvas = new fabric.Canvas(canvasEl, {
                willReadFrequently: true,
                backgroundColor: "#fff"
            });

            img.set({
                left: img.left  + maxOutlineValue, 
                top: img.top  + maxOutlineValue
            });
            // Add outlines
            outlines.forEach(outlinePath => {
                const line = new fabric.Polyline(outlinePath, {
                    stroke: outLineColor || 'red',
                    strokeWidth: outLineValue * 2,
                    fill: "", // No fill
                    selectable: false,
                    evented: false,
                    objectCaching: false,
                    strokeLineCap: "round",
                    strokeLineJoin: "round",
                    originX: "center",
                    originY: "center"
                });
                line.set({
                    left: line.left - 4.5 + maxOutlineValue, 
                    top: line.top - 4.5 + maxOutlineValue
                });                        
                fabricCanvas.add(line);
            });

            // Add image and render
            fabricCanvas.add(img);

            // const dottedRect = new fabric.Rect({
            //     left: maxOutlineValue,       
            //     top: maxOutlineValue,        
            //     width: img.width,     
            //     height: img.height,    
            //     fill: '',       
            //     stroke: 'lightgray', 
            //     strokeWidth: 1, 
            //     strokeDashArray: [10, 5], 
            //     selectable: false, 
            //     evented: false 
            // });
            // fabricCanvas.add(dottedRect);
            fabricCanvas.renderAll();

            // Convert to Data URL
            setTimeout(() => {
                const imgData = fabricCanvas.toDataURL("image/png");
                resolve({ filename: `${file.filename.slice(0, file.filename.lastIndexOf('.'))}-${file.id}.png`, imgData });
            }, 100); // Small delay for rendering
        });
    });
};