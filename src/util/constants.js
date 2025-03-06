/*/////////////////////////////////////////////////////////////
  This file defines constants used in the application.
*/////////////////////////////////////////////////////////////

const UPLOAD_API = "https://photoai.vheer.com/api/PhoAi/Upload";
const CHECK_STATUS_API = "https://photoai.vheer.com/api/PhoAi/CheckStatus";

const UPLOAD_API_IMGLARGER = "https://photoai.imglarger.com/api/PhoAi/Upload";
const CHECK_STATUS_API_BGERASER = "https://photoai.imglarger.com/api/PhoAi/CheckBberaserStatus";

const FUN_DIC = {
  'background_remover': 4, //4的bgremover调用的自己的方法 
  'blur_background': 4, //4的bgremover调用的自己的方法 
}; 

const BTN_CONTENT = (t, function_type=null) => {
  return {
    original: function_type == 3 ? t('btn_backgroundRemover') : t('btn_original'),
    processing: t('btn_processing'),
    regenerate: t('btn_regenerate'),
    uploading: t('btn_uploading'),
    downloading: t('btn_downloading'),
    download: t('btn_download'),
    downloadAll: t('btn_downloadAll'),
    saveAll: t('btn_saveAll'),
    convertAll: t('btn_convertAll'),
    resizeAll: t('btn_resizeAll'),
    enlargeAll: t('btn_enlargeAll'),
    blurBackground: t('btn_blurBackground'),
  }
}

const MAX_SIZE = 3000;



export { UPLOAD_API, CHECK_STATUS_API, FUN_DIC, BTN_CONTENT, MAX_SIZE, UPLOAD_API_IMGLARGER, CHECK_STATUS_API_BGERASER };