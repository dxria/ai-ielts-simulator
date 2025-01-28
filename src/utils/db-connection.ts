import prisma from './prisma-client';

const ConnectToDB = async () => {
    try {
        await prisma.$connect();
    } catch (error) {
        throw new Error('Error in connecting to db. ' + error);
    }
};
export default ConnectToDB;
