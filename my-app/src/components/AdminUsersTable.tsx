import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { UserResponse } from "../types";

interface Props {
  users: UserResponse[];
}

const AdminUsersTable: React.FC<Props> = ({ users }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 480,
        borderRadius: 3,
        boxShadow: 4,
        overflowX: "auto",
      }}
    >
      <Table stickyHeader size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Rola</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                <Typography color="text.secondary" variant="body1">
                  Brak użytkowników do wyświetlenia
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUsersTable;
