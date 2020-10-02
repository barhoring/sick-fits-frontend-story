import React, { useEffect, useState, useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { file as fileUtils } from "../../utils";
import { ThemeContext } from "../../ThemeContext";
import { Card, CardActions, CardContent } from "@material-ui/core/";
import useStyles from "./useStyles";
import { FileNameHeading, GithubLink } from "../../components";
import { fetchRawGithubFile } from "./helpers";

const Editor = ({ filePath, fileName, githubLink }) => {
  const classes = useStyles();
  const { isDarkMode } = useContext(ThemeContext);
  const [text, setText] = useState(null);
  // fetch the file from raw github

  useEffect(() => {
    debugger;
    fetchRawGithubFile(filePath, setText);
  }, []);

  return (
    <div className={classes.container}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {/* id is for an in-page anchor sent from the accordion */}
          <p id={fileName}>
            <FileNameHeading {...{ link: githubLink, fileName }} />
          </p>
          <div className={classes.editor}>
            <MonacoEditor
              value={text || ""}
              theme={isDarkMode ? "dark" : "light"}
              language={fileUtils.getLanguage(filePath)}
            />
          </div>
        </CardContent>
        <CardActions>
          <GithubLink commitGithubLink={githubLink} />
        </CardActions>
      </Card>
    </div>
  );
};

export default Editor;
