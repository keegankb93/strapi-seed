import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";

export default function FieldList({ model }) {
  return (
    <Table colCount={2} rowCount={model.attributes.length + 1}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma" textColor="neutral600">
              Field
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma" textColor="neutral600">
              Type
            </Typography>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {model.attributes.map((attribute) => {
          return (
            <Tr key={`${model.name}-${attribute.field}`}>
              <Td>
                <Typography
                  textColor="neutral800"
                  variant="omega"
                  fontWeight="bold"
                >
                  {attribute.field}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attribute.type}</Typography>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
