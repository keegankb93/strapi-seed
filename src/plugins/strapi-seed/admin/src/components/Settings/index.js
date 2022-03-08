import React, { useEffect } from "react";
import { useNotification } from "@strapi/helper-plugin";
import { TextInput } from "@strapi/design-system/TextInput";
import { Button } from "@strapi/design-system/Button";
import ModelList from "../ModelList";
import { deleteSeededItems, seedModel, write } from "../../actions";
import { Grid, GridItem } from "@strapi/design-system/Grid";

export default function Settings({ setModel, model, aceEditor }) {
  const toggleNotification = useNotification();

  function messageNotification(action, res = "") {
    const type = res.success ? "success" : "warning";
    const message = res.success ? res.success : res.error.message;

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

  async function saveFile() {
    const data = aceEditor.current.editor.getValue();
    const res = await write({ filename: model.filename, fileData: data });
    messageNotification("save", res);
  }

  async function seed() {
    const data = aceEditor.current.editor.getValue();
    const res = await seedModel({
      uid: model.uid,
      model: model.name,
      data: data,
    });
    messageNotification("seed", res);
  }

  async function deleteItems() {
    const res = await deleteSeededItems({ uid: model.uid });
    console.log(res);
    messageNotification("delete", res);
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
          <Button
            style={{ marginRight: ".5rem" }}
            onClick={deleteItems}
            variant="danger"
          >
            Delete
          </Button>
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
