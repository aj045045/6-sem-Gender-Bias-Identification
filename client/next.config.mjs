const config = {
    async rewrites() {
        return [
            {
                source: '/api/:path',
                destination: process.env.FLASK_API || ''
            },
        ];
    },
};

export default config;
