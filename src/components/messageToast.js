'use client'
import React, { useEffect } from 'react';
export default function MessageToast({ messageInfo, clearMessage }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            clearMessage(); // This will set the message to '' after 3 seconds
        }, 5000);

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [clearMessage]); // Dependency array, re-run the effect if clearMessage changes

    return (
        <div className="fixed top-12 start-1/2 z-30 -translate-x-1/2 ">
            <div className="max-w-lg bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabindex="-1" aria-labelledby="hs-toast-placement-top-center-label">
                <div className="inline-flex items-center gap-x-2 px-4 py-2">
                    <div className="flex-shrink-0">
                        {
                            messageInfo.messageType === 'success' &&
                            <svg className="flex-shrink-0 size-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                            </svg>
                        }
                        {
                            messageInfo.messageType === 'info' &&
                            <svg className="flex-shrink-0 size-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                            </svg>
                        }
                        {
                            messageInfo.messageType === 'error' &&
                            <svg className="flex-shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                            </svg>
                        }
                        {
                            messageInfo.messageType === 'warning' &&
                            <svg className="flex-shrink-0 size-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        }

                    </div>
                    <p id="hs-toast-placement-top-center-label" className="ml-2 text-xs text-gray-700 font-semibold sm:text-base dark:text-white text-left">
                        {messageInfo.message}
                    </p>
                    <button className="" aria-label="Close" onClick={clearMessage}>
                    </button>
                </div>
            </div>
        </div>
    );
}