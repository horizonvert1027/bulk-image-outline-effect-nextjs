//// 与app页面upload, check status, result, download 和 图片处理相关函数
import { FUN_DIC } from "./constants";

export const appendUploadForm = async ({
    formData,
    function_type = 0,
    formDataFile = null,
    userType = 0,
    encryptedPrompts = '',
    aspectRatio = { width: 0, height: 0 },
    function_name = ''
}) => {
    try {
        console.log(`####function_type####`, function_type);
        let file;

        switch (function_type) {
            case 0: // portrait generator (Anime & Real)
                file = await processImage(formDataFile, userType, function_type);
                formData.append("file", file);
                formData.append("prompt", encryptedPrompts);
                formData.append("type", function_type);
                formData.append("width", aspectRatio.width);
                formData.append("height", aspectRatio.height);
                break;
            case 1: // flux generator & tattoo design
                formData.append("prompt", encryptedPrompts);
                formData.append("type", function_type);
                formData.append("width", aspectRatio.width);
                formData.append("height", aspectRatio.height);
                break;
            case 2: // sdxl random image generator
                formData.append("prompt", encryptedPrompts);
                formData.append("type", function_type);
                formData.append("width", aspectRatio.width);
                formData.append("height", aspectRatio.height);
                formData.append("batch_size", 4);
                break;
            case 3: // background remover
                formData.append('file', formDataFile);
                formData.append('type', FUN_DIC[function_name]);
                formData.append('mattValue', 0);
                break;
            default:
                throw new Error("Invalid function type");
        }

        return 0;
    } catch (error) {
        console.error("Error appending files to form data:", error);
        throw error;
    }
};

export const handlePromptsCombine = ({
    function_type = 0,
    function_name = '',
    animePortraitPrompts = {},
    realPortraitPrompts = {},
    fluxPrompts = {},
    tattooPrompts = {},
    logoPrompts = {},
    furryPrompts = {},
    pixelPrompts = {},
    sdxlPrompts = {}
}) => {
    try {
        switch (function_type) {
            case 0: // portrait generator (Anime & Real)
                let portrait_Prompts = '';
                if (function_name === "anime_portrait") {
                    portrait_Prompts = `A stunning anime portrait in ${animePortraitPrompts.style}, the gender is ${animePortraitPrompts.genderPrompt}, set against ${animePortraitPrompts.backgroundPrompt}, featuring ${animePortraitPrompts.expressionPrompt}. The character wears ${animePortraitPrompts.clothesPrompt}, with ${animePortraitPrompts.moreDetails}. The composition captures vibrant colors, soft lighting, and intricate details, highlighting the character's emotions and unique charm.`;
                } else {
                    portrait_Prompts = `A lifelike headshot in ${realPortraitPrompts.style}, the gender is ${realPortraitPrompts.genderPrompt}, set against ${realPortraitPrompts.backgroundPrompt}, featuring ${realPortraitPrompts.expressionPrompt}. The subject is dressed in ${realPortraitPrompts.clothesPrompt}, with ${realPortraitPrompts.moreDetails}. The lighting is natural, enhancing the subject's features and creating a detailed, intimate portrait.`;
                }
                return portrait_Prompts;
            case 1: // flux generator & tattoo design
                let flux_Prompts = fluxPrompts.mainPrompt ? fluxPrompts.mainPrompt.substring(0, 150) : '';
                if (function_name === "tattoo_design") {
                    flux_Prompts = `An exquisite ${tattooPrompts.tattooStyle.substring(0, 50)} tattoo, featuring ${tattooPrompts.tattooDescription.substring(0, 50)}, in a ${tattooPrompts.tattooSize.substring(0, 50)} size. Placed on the ${tattooPrompts.tattooPlacement.substring(0, 50)}, the design showcases ${tattooPrompts.colorScheme.substring(0, 50)} tones and ${tattooPrompts.detailLevel.substring(0, 50)} detailing. This tattoo embodies the wearer's personal journey and unique essence, making it a visually captivating piece that speaks volumes about both artistry and character.`;
                }
                if (function_name === "logo_generator") {
                    flux_Prompts = `Creating a ${logoPrompts.logoStyle.substring(0, 50)}-inspired logo for "${logoPrompts.logoBusinessName.substring(0, 50)}", reflecting the essence of ${logoPrompts.logoBusinessDetail.substring(0, 50)}. The design incorporates ${logoPrompts.logoDesignDetails.substring(0, 50)}, capturing the spirit of the business and ensuring it stands as a timeless representation of its unique identity.`;
                }
                if (function_name === "furry_art_generator") {
                    flux_Prompts = `Create a detailed ${furryPrompts.furryStyle} furry art character, a seamless blend of half-human, half-${furryPrompts.furryAnimalName}, against a ${furryPrompts.furryBackgroundDetail}. The character features expressive eyes, intricate fur textures, and unique details like ${furryPrompts.furryAdditionalDetail}, all brought to life with dynamic lighting.`;
                }
                if (function_name === "pixel_art_generator") {
                    flux_Prompts = `Create a high-quality ${pixelPrompts.pixelStyle} pixel art design featuring a detailed ${pixelPrompts.pixelSubjectName} in a ${pixelPrompts.pixelBackgroundDetail}. The design emphasizes blocky, pixelated features with hard, jagged edges, a limited color palette, and a low-resolution aesthetic that highlights the retro charm of pixel art, ensuring a strong and recognizable pixelated look. More details include ${pixelPrompts.pixelAdditionalDetail}.`;
                }
                return flux_Prompts;
            case 2: // sdxl random image generator
                let sdxl_Prompts = sdxlPrompts.mainPrompt ? sdxlPrompts.mainPrompt.substring(0, 150) : '';
                return sdxl_Prompts;
            default:
                throw new Error("Invalid function type");
        }
    } catch (error) {
        console.error("Error generating prompts:", error);
        return "";
    }
};

export const handleDragOver = (e, setIsDragging) => {
    e.preventDefault();
    setIsDragging(true);
};

export const handleDragLeave = (e, setIsDragging) => {
    e.preventDefault();
    setIsDragging(false);
};

export const handleDrop = (e, setIsDragging, function_type, handleMultipleFileChange, handleFileChange=null) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (function_type === 3) {
        handleMultipleFileChange(files);
    } else {
        handleFileChange(files);
    }
};

export const drawImageWithBackground = async (imageUrl, backgroundColor) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Handle cross-origin images
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw background color
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Convert canvas to blob URL
            canvas.toBlob((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
            }, "image/png");
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
};