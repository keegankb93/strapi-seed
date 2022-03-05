/*
 *
 * HomePage
 *
 */
import React, { memo, useRef, useEffect, useState } from "react";
import ModelList from "../../components/ModelList";
import EditorJSON from "../../components/EditorJSON";
import FieldList from "../../components/FieldList";
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
import { Button } from "@strapi/design-system/Button";
import { Alert } from "@strapi/design-system/Alert";

// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";

const StackCentered = styled(Stack)`
  align-items: center;
`;

const HomePage = () => {
  const { formatMessage } = useIntl();
  const aceEditor = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [model, setModel] = useState({
    uid: "",
    name: "",
    filename: "",
    attributes: [],
  });

  function saveFile() {
    const data = aceEditor.current.editor.getValue();

    try {
      JSON.parse(data);
      upload({ filename: model.filename, data: data });
    } catch (e) {
      console.log("custom error msg", e);
    }
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
                  <Alert
                    variant="success"
                    onClick={() => setShowAlert(false)}
                    className={`${
                      showAlert ? "display: block" : "display: none"
                    }`}
                  >
                    {model.name} saved!
                  </Alert>
                  <ModelList
                    setModel={setModel}
                    model={model}
                    saveFile={saveFile}
                  />
                  <TextInput
                    value={model.filename || ""}
                    name={model.filename || ""}
                    label="Filename"
                    disabled
                  />
                  <Button>Seed</Button>
                  <Button
                    onClick={() => {
                      saveFile();
                      setShowAlert(true);
                    }}
                    variant="success"
                  >
                    Save
                  </Button>
                </GridItem>
                <GridItem padding={6}>
                  <EditorJSON model={model} aceEditor={aceEditor} />
                </GridItem>
                <GridItem padding={6}>
                  <FieldList model={model} />
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
