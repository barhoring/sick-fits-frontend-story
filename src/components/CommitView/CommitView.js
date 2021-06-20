import React from "react"
import { CommitContainer, CommitSelectorContainer } from "../../containers"
import { navigate } from "@reach/router"
import defaultState from "../../meta-data/hashDefaultState.json"
import Chapter from "../Chapter"
import { chapterRepo as filePath } from "../../meta-data/repoSettings.json"

const firstHash = defaultState.ids[0]

const CommitView = ({ hash, prevHash, nextHash }) => {
  if (!hash) {
    navigate(`/commits/${firstHash}`, { state: { name: "bar" } }, { replace: true })
    hash = firstHash
  }

  const selectorProps = { prevHash, nextHash, hash }
  const commitProps = { hash, prevHash }
  return (
    <div style={{ marginTop: "5rem" }}>
      {" "}
      <CommitSelectorContainer {...selectorProps} />
      {filePath && <Chapter hash={hash} />}
      <CommitContainer {...commitProps} />
    </div>
  )
}

export default CommitView
