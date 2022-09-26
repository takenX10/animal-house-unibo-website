export const SERVER_URL = "http://localhost:8000"
export function isEqualPath(path, test) {
  if (test.includes(":")) {
    let subtest = test.replace(test.substring(test.lastIndexOf("/")), "")
    let subpath = path.replace(path.substring(path.lastIndexOf("/")), "")
    return subpath == subtest
  }
  return path == test
}

