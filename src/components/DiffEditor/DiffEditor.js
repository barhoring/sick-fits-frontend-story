import React, { useState } from "react";
import { DiffEditor as MonacoDiffEditor } from "@monaco-editor/react";
import { file as fileUtils } from "../../utils";
import examples from "../../config/diff";

import { ThemeContext } from "../../ThemeContext";

import useStyles from "./useStyles";

const DiffEditor = ({ filePath }) => {
  const [original, setOriginal] = useState(null);
  const [modified, setModified] = useState(null);

  const { isDarkMode } = React.useContext(ThemeContext);
  debugger;
  console.log("isDarkMode", isDarkMode);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MonacoDiffEditor
        theme={"dark"}
        original={original || examples.original}
        modified={modified || examples.modified}
        language={"markdown"}
      />
    </div>
  );
};

export default DiffEditor;
