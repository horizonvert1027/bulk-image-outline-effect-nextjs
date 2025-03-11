import React from 'react';
import FunctionsGroup from './_components/multipleUploadFunctionsGroup';

const function_name = 'blur_background';

export default function Page() {
    const function_type = 3;  // 0: single image [anime & real portrait], 1: no added image, [textToImage & tattoo design]. 3: multiple images [background remover]


    return (
        <>
            <div className='pt-[3.6rem] w-full bg-neutral-100 dark:bg-neutral-900 px-4 2xl:px-0'>
                <div className='max-w-screen-xl mx-auto pb-[2rem] flex flex-col text-center'>
                    <FunctionsGroup  function_type={function_type} function_name={function_name}/>
                </div>
                <div className='text-center'>
                    <p className='text-center'>
                        Contact: Volodymyr Burlaka
                    </p>
                    <a href="mailto:volodymyrburlaka048@gmail.com">volodymyrburlaka048@gmail.com</a>
                </div>
            </div>
        </>
    );
}