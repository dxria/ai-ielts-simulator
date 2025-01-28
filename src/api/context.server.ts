'use server'

import { cookies } from 'next/headers'

export const context = async () => {
    const cookieList = cookies()

    return {
        cookie: cookieList.toString(),
    }
}
