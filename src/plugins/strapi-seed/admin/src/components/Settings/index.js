import React, { useEffect } from "react";
import { findSeed } from "../../actions";
import { useNotification } from "@strapi/helper-plugin";
import { TextInput } from "@strapi/design-system/TextInput";
import { Button } from "@strapi/design-system/Button";
import ModelList from "../ModelList";
import { upload, seedModel } from "../../actions";
import { Grid, GridItem } from "@strapi/design-system/Grid";

export default function Settings({ setModel, model, aceEditor }) {
  const toggleNotification = useNotification();

  function messageNotification(action, type, error = "") {
    const messages = {
      save: {
        success: `${model.name} has been saved successfully`,
        error: error,
      },
      seed: {
        success: `${model.name} has been seeded successfully`,
        error: error,
      },
    };

    const message =
      error.length === 0 ? messages[action].success : messages[action].error;

    toggleNotification({
      // required
      type: type,
      // required
      message: {
        id: `${action}.message.${type}`,
        defaultMessage: message,
      },
      // optional: default = false
      blockTransition: false,
    });
  }

  function saveFile() {
    const data = aceEditor.current.editor.getValue();

    try {
      JSON.parse(data);
      upload({ filename: model.filename, data: data });
    } catch (e) {
      console.log(e);
      return messageNotification("save", "warning", `${e.message}`);
    }
    messageNotification("save", "success");
  }

  async function seed() {
    const data = aceEditor.current.editor.getValue();
    const res = await seedModel({
      uid: model.uid,
      model: model.name,
      data: data,
    });
    messageNotification("seed", "success");
  }

  return (
    <>
      <ModelList setModel={setModel} model={model} saveFile={saveFile} />
      <div style={{ marginBottom: ".5rem" }}>
        <TextInput
          value={model.filename || ""}
          name={model.filename || ""}
          label="Filename"
          disabled
        />
      </div>
      {model.name && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button style={{ marginRight: ".5rem" }} onClick={seed}>
            Seed
          </Button>
          <Button onClick={saveFile} variant="success">
            Save
          </Button>
        </div>
      )}
    </>
  );
}
