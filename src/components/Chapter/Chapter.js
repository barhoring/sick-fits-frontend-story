import React, { useState } from "react"
import MarkdownPreview from "@uiw/react-markdown-preview"
import { fetchRawGithubFile } from "../../utils"
import useStyles from "./useStyles"
import { Paper } from "@material-ui/core"
import {
  chapterRepo as filePath,
  GITHUB_CONTENT_BASE,
  userName,
  chapterRepo,
} from "../../meta-data/repoSettings.json"

const Chapter = ({ hash }) => {
  const [text, setText] = useState("")
  const classes = useStyles()
  if (!filePath) return null
  fetchRawGithubFile(
    `${GITHUB_CONTENT_BASE}/${userName}/${chapterRepo}/master/${hash}.md`,
    setText
  )
  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3} square={true}>
          <MarkdownPreview source={text} />
        </Paper>
      </div>
    </div>
  )
}

export default Chapter
