export const extractImageUrl = (img: string) => {
    const cleanedInput = img.replace(/\\?"|\[|\]/g, '')
    const urlRegex = /^https?:\/\/[^\s]+$/
    return urlRegex.test(cleanedInput) ? cleanedInput : ''
}