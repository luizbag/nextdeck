/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/game',
                permanent: false,
                destination: '/',
            }
        ]
    }
};

export default nextConfig;
