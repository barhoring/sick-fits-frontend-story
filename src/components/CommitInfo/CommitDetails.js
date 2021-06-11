import React, { useEffect, useState } from "react"
import { Typography, Divider } from "@material-ui/core"
import useStyles from "./useStyles"
import axios from "axios"
import { getGithubAPIUri, getGithubRepoAtThisPointLink } from "../../utils"
import { Commiter } from "../../components"

const CommitDetails = ({ hash, authorName }) => {
  const [commiterDetails, setCommiterDetails] = useState({})
  useEffect(() => {
    // Optionally the request above could also be done as
    axios
      .get(getGithubAPIUri(authorName))
      .then(function (response) {
        console.log(response)
        const data = response.data.items[0]
        const { login, avatar_url } = data
        setCommiterDetails({ commiter: login, avatar_url })
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        console.log("always")
        // always executed
      })
  }, [authorName])

  const classes = useStyles()
  const avatar_url = commiterDetails.avatar_url
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Commit Details
      </Typography>
      <Divider component="hr" />
      <div>
        <p className={classes.commitDetails}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Commit{" "}
            <a
              href={getGithubRepoAtThisPointLink(hash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hash}
            </a>
          </Typography>
          <div>
            {/* <Typography variant="h5" component="h2"> */}
            <div
              style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
            >
              <div>by ({authorName})</div>
              <a
                href={`https://github.com/${commiterDetails.commiter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {avatar_url && <Commiter userImage={commiterDetails.avatar_url} />}
              </a>
            </div>
            {/* </Typography> */}
          </div>
          <Typography className={classes.pos} color="textSecondary">
            on September 12, 1991
          </Typography>
        </p>
      </div>
    </>
  )
}

export default CommitDetails
