export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return false
  }

  return true
}