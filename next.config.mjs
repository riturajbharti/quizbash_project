/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["lh3.googleusercontent.com"],
    },
    typescript:{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreBuildErrors:true
    }
};

export default nextConfig;
