/*
 * @Author: 623301600@qq.com 623301600@qq.com
 * @Date: 2024-08-09 23:19:29
 * @LastEditors: wzp_vicky 623301600@qq.com
 * @LastEditTime: 2024-08-26 22:47:57
 * @FilePath: /-website/src/app/layout.js
 * @Description:
 *
 */
import { Inter } from "next/font/google"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import MenuNav from "../components/menuNav"
import FooterBar from "../components/footerBar"
import { cookies } from "next/headers"
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import PrelineScript from "../components/prelineScript";
import { ReduxProvider } from "../store"
import Script from 'next/script'


const inter = Inter({
    subsets: ["latin"]
})

export default async function RootLayout({
    children,
}) {
    let hasCookie = cookies().has("Authorization")
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <body className={`${inter.className} bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-100`}
                    >
                    <ReduxProvider>
                        <GoogleAnalytics gaId="G-CD46LH948W" />
                        <MenuNav hasCookie={hasCookie} />
                        {children}
                        <FooterBar />
                        <Script src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" />
                    </ReduxProvider>
                </body>
            </NextIntlClientProvider>
            <PrelineScript />
        </html>
    )
}
