export const callSuccess = (res: any) => {
    return { ...res, error: false }
}

export const callFailed = () => {
    return {
        error: true,
        status: false,
        message: 'Unable to connect to server, please try again!'
    }
}