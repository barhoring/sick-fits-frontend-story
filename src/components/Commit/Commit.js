import React from "react"
import { AddedFilesContainer, CommitInfoContainer } from "../../containers"
import { Chapter } from "../../components"
import { chapterRepo as filePath } from "../../meta-data/repoSettings.json"

import { ModifiedContainer } from "../../containers"

const Commit = ({ hash, prevHash }) => {
  return (
    <>
      <CommitInfoContainer hash={hash} />
      {filePath && <Chapter hash={hash} />}
      <ModifiedContainer hash={hash} prevHash={prevHash} />
      <AddedFilesContainer hash={hash} />
    </>
  )
}

export default Commit
