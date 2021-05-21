export default function isEmpty(obj: Record<string, unknown>) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }

  return true
}
