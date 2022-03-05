/*
 *
 * HomePage
 *
 */
import React, { memo, useRef, useEffect, useState } from "react";
import { upload, getContentTypes, findSeed } from "../../actions";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import {
  ComboboxOption,
  CreatableCombobox,
} from "@strapi/design-system/Combobox";
import { ContentBox } from "@strapi/helper-plugin";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Select, Option, OptGroup } from "@strapi/design-system/Select";
import { Field, FieldInput } from "@strapi/design-system/Field";
import { Card, CardContent } from "@strapi/design-system/Card";
import { BaseButton } from "@strapi/design-system/BaseButton";
import {
  LoadingIndicatorPage,
  useNotification,
  useFocusWhenNavigate,
} from "@strapi/helper-plugin";
import {
  Layout,
  HeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Main } from "@strapi/design-system/Main";
import { useNotifyAT } from "@strapi/design-system/LiveRegions";
import { Typography } from "@strapi/design-system/Typography";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";

const StackCentered = styled(Stack)`
  align-items: center;
`;

const HomePage = () => {
  const { formatMessage } = useIntl();
  const aceEditor = useRef(null);
  const [modelList, setModelList] = useState([]);
  const [model, setModel] = useState({});
  const [modelAttributes, setModelAttributes] = useState([]);
  const [value, setValue] = useState();
  const [editorValue, setEditorValue] = useState("");
  const [filename, setFilename] = useState("");

  useEffect(async () => {
    const contentTypes = await getContentTypes();
    setModelList(contentTypes);
  }, []);

  useEffect(async () => {
    console.log(filename);
    const fileData = await findSeed({ filename: filename });
    console.log(fileData);
    setEditorValue(JSON.stringify(fileData, null, "\t"));
  }, [filename]);

  useEffect(() => {
    if (editorValue !== "") {
      console.log(model.attributes);
      const attributes = [];
      for (const [key, value] of Object.entries(model.attributes)) {
        attributes.push([key, value]);
      }
      console.log(attributes);
      setModelAttributes(attributes);
    }
  }, [editorValue]);

  /*   function onChange(newValue) {
    console.log("change", newValue);
  } */

  function onClick() {
    const data = aceEditor.current.editor.getValue();
    upload({ filename: filename, data: data });
  }

  async function getModelAttributes() {}

  async function readFile() {}

  function handleListChange(e) {
    setValue(e);
    const [selectedModel] = modelList.filter(
      (model) => e === model.collectionName
    );
    setModel(selectedModel);
    setFilename(`${selectedModel.collectionName}.json`);
  }

  return (
    <>
      <Layout>
        <Main>
          <HeaderLayout
            title="Strapi Seed"
            subtitle="Create seed data and seed your database."
          />
          <ContentLayout>
            <Card>
              <Grid padding={2} gridCols={3}>
                <GridItem padding={6}>
                  <Select
                    label="Select a model"
                    onChange={handleListChange}
                    placeholder="Model..."
                    value={value || ""}
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
                  <TextInput
                    value={filename}
                    name={filename}
                    label="Filename"
                    disabled
                  />
                  <BaseButton>Seed</BaseButton>
                  <BaseButton onClick={onClick}>Save</BaseButton>
                </GridItem>
                <GridItem padding={6}>
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
                </GridItem>
                <GridItem padding={6}>
                  <h2 style={{ "margin-bottom": "12px" }}>Fields</h2>
                  {modelAttributes.map((attribute) => (
                    <div key={`${model.collectionName}${attribute[0]}`}>
                      {`${attribute[0]}: ${attribute[1].type}`}
                    </div>
                  ))}
                </GridItem>
              </Grid>
            </Card>
          </ContentLayout>
        </Main>
      </Layout>
    </>
  );
};

export default memo(HomePage);
