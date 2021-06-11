// This code is more readable with if than switch IMO

import repoSettings from "../meta-data/repoSettings.json"

const { repoName, githubLink, userName, GITHUB_CONTENT_BASE } = repoSettings

const getExt = (file) => {
  const index = file.lastIndexOf(".")
  const ext = file.substring(index + 1, file.length)
  return ext
}

const getLanguage = (file) => {
  const ext = getExt(file)
  if (ext === "js") return "javascript"
  if (ext === "ts") return "typescript"
  if (ext === "json") return "json"
  if (ext === "html") return "html"
  if (ext === "css") return "css"
  if (ext === "md") return "markdown"
  return "text"
}

const getFileName = (file) => {
  const index = file.lastIndexOf("/")
  const name = file.substring(index + 1, file.length)
  return name
}

// const uri_format = `https://raw.githubusercontent.com/barhoring`;
// TODO change repo name to new repo
// const repoName = "reach-router";
// const repoName = "sick-fits-frontend";

// "GITHUB_CONTENT_BASE": "https://raw.githubusercontent.com",
// "uri_format": "https://raw.githubusercontent.com/barhoring",

const getFileUri = (hash, fileName) => {
  const uri = `${GITHUB_CONTENT_BASE}/${userName}/${repoName}/${hash}/${fileName}`
  return uri
}

// const githubCommitLink = `https://github.com/barhoring/sick-fits-frontend/blob/`;
// "githubCommitLink": "https://github.com/barhoring/reach-router/blob",

const getGithubCommitLink = (hash, fileName) =>
  `${githubLink}/${userName}/${repoName}/blob/${hash}/${fileName}`

const objectToString = (obj) => JSON.stringify(obj, null, "\t")

export default {
  getLanguage,
  getExt,
  getFileName,
  getFileUri,
  objectToString,
  getGithubCommitLink,
}
