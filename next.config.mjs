/*
 * @Author: 623301600@qq.com 623301600@qq.com
 * @Date: 2024-08-09 23:19:29
 * @LastEditors: 623301600@qq.com 623301600@qq.com
 * @LastEditTime: 2024-08-10 12:47:21
 * @FilePath: /-website/next.config.mjs
 * @Description: 
 * 
 */
/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const isProduction = process.env.NODE_ENV === 'production';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // compiler: isProduction ? {
    //     removeConsole: {
    //       exclude: ['error'],
    //     },
    //   } : {},
    // async redirects() {
    //     return [
    //     ];
    // },
    
}


export default withNextIntl(nextConfig)
