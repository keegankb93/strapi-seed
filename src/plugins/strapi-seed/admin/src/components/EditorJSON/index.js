import React, { useRef, useEffect, useCallback, useState, memo } from "react";
import { findSeed } from "../../actions";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

// If we don't update the value due to error then it will revert to the previous read value due to useNotification()
// So we use memo
export default memo(function EditorJSON({ model, aceEditor }) {
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (model.name.length === 0) {
      const init = {
        MODELNAME: [
          {
            FIELD: "VALUE",
          },
        ],
      };
      setEditorValue(JSON.stringify(init, null, "\t"));
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
      placeholder="Paste or edit your JSON here"
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
});
