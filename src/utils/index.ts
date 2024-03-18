export const apiResponse = (code: number, message: string, body: any) => {
  return {
    code: code,
    message: message || '',
    body: body,
  }
}
