import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Pagination,
  Stack,
} from "@mui/material";

const TodosList = ({ rows }) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  useEffect(() => {
    if (rows.length / 5 <= page) {
      setPage(Math.max(0, Math.floor((rows.length - 1) / 5)));
    }
  }, [rows]);
  console.log(rows);
  return (
    <TableContainer component={Paper} id="table-container">
      {rows[0] ? (
        <Table aria-label="simple table">
          <colgroup>
            <col style={{ width: "10%", align: "center" }} />
            <col style={{ width: "80%" }} />
            <col style={{ width: "10%", align: "center" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>USER ID</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>COMPLETED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 5, page * 5 + 5).map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell align="center">
                  {row.completed ? <CheckIcon /> : <ClearIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1>No Results</h1>
      )}
      {rows[0] ? (
        <Stack>
          <Pagination
            count={Math.ceil(rows.length / 5)}
            color="primary"
            page={page + 1}
            component="div"
            rowsPerPage={5}
            onChange={handleChangePage}
          />
        </Stack>
      ) : (
        ""
      )}
    </TableContainer>
  );
};

export default TodosList;
