import classes from "./specifications-table.module.scss";

import { Paper, Table } from "@mantine/core";

import { LabelValue } from "@/types";

type Props = {
  specifications: LabelValue[];
};

const SpecificationsTable = ({ specifications }: Props) => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  return (
    <Paper withBorder>
      <Table verticalSpacing="sm">
        <Table.Tbody>
          {specifications.map((spec) => (
            <Table.Tr className={classes.specRow} key={spec.value}>
              <Table.Th className={classes.specLabel} fw="normal">
                {spec.label}
              </Table.Th>
              <Table.Td className={classes.specValue}>{spec.value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default SpecificationsTable;
