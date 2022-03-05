import React, { useRef, useEffect, useState } from "react";
import { findSeed } from "../../actions";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditorJSON({ model, aceEditor }) {
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (model.name.length === 0) {
      return;
    }

    async function readFile() {
      const fileData = await findSeed({ filename: model.filename });
      return fileData;
    }
    readFile().then((res) => setEditorValue(JSON.stringify(res, null, "\t")));
  }, [model]);

  return (
    <AceEditor
      ref={aceEditor}
      wrapEnabled={true}
      placeholder="See example at ..."
      mode="json"
      theme="monokai"
      name="strapi-seed-json"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={editorValue}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
