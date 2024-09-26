export const removeHtmlTags = (str) =>    str.replace(/<[^>]*>/g, '').trim()
