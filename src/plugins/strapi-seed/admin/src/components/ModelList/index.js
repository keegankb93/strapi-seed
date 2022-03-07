import React, { useState, useEffect } from "react";
import { Select, Option } from "@strapi/design-system/Select";
import { getContentTypes } from "../../actions";

export default function ModelList({ setModel, model }) {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const models = await getContentTypes();
      return models;
    }
    fetchModels().then((res) => setModelList(res));
  }, []);

  function getAttributes(obj) {
    const attributes = [];

    for (const [key, value] of Object.entries(obj.attributes)) {
      const attribute = {
        field: key,
        type: value.type,
      };
      attributes.push(attribute);
    }

    return attributes;
  }

  function handleSelect(modelName) {
    const [selectedModel] = modelList.filter(
      (model) => modelName === model.collectionName
    );
    const attributes = getAttributes(selectedModel);
    setModel({
      uid: selectedModel.uid,
      name: selectedModel.collectionName,
      filename: `${selectedModel.collectionName}.json`,
      attributes: attributes,
    });
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Select
        label="Select a model"
        onChange={handleSelect}
        placeholder="Model..."
        value={model.name || ""}
      >
        {modelList.map((model) => {
          return (
            <Option
              key={model.uid}
              label={model.collectionName}
              value={model.collectionName}
            >
              {model.collectionName}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
