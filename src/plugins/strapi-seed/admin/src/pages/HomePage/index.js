/*
 *
 * HomePage
 *
 */
import React, { memo, useRef } from "react";
import { upload } from "../../actions";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import { ContentBox } from "@strapi/helper-plugin";
import { Stack } from "@strapi/design-system/Stack";
import { Grid } from "@strapi/design-system/Grid";
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

  /*   function onChange(newValue) {
    console.log("change", newValue);
  } */

  function onClick(name) {
    const data = aceEditor.current.editor.getValue();
    upload({ name: "test", data: data });
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
            <Grid gridCols={3}>
              <Card padding={8}>
                <CardContent>test</CardContent>
              </Card>
              <Card padding={8}>
                <CardContent>
                  <AceEditor
                    ref={aceEditor}
                    placeholder="See example at ..."
                    mode="json"
                    theme="monokai"
                    name="strapi-seed-json"
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={``}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                  />
                </CardContent>
              </Card>
              <Card padding={8}>
                <CardContent>test</CardContent>
              </Card>
            </Grid>
          </ContentLayout>
        </Main>
        <BaseButton onClick={onClick}>Click</BaseButton>
      </Layout>
    </>
  );
};

export default memo(HomePage);
