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
      aceEditor.current.editor.setReadOnly(true);
      return;
    } else {
      aceEditor.current.editor.setReadOnly(false);
    }

    async function readFile() {
      const fileData = await findSeed({ filename: model.filename });

      if (fileData.success) {
        console.log("did i render twice?");
        setEditorValue(fileData.success, null, "\t");
      } else {
        console.log(
          "Error reading seed file, setting editor to defaults for model...",
          fileData.error
        );
        const defaultJSON = {};
        defaultJSON[model.name] = [
          {
            modelField: "modelValue",
          },
        ];
        setEditorValue(JSON.stringify(defaultJSON, null, "\t"));
      }
    }

    readFile();
  }, [model]);

  return (
    <AceEditor
      disabled
      ref={aceEditor}
      wrapEnabled={true}
      placeholder="Select a model to create, edit or paste your seed data"
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
