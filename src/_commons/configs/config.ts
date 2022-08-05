import dotenv from 'dotenv';

dotenv.config();

const Configuration = {

    api: {
        port: process.env.API_PORT,
        url: process.env.API_HOST,
        route: process.env.API_ROUTE
    },
    db: {
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        hostname: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS

    },
    eureka: {
        port: process.env.EUREKA_PORT || 8761,
        host: process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || '127.0.0.1',
        servicePath: '/eureka',
        maxRetries: 10,
        requestRetryDelay: 2000,
    }
};

export default Configuration;