import React from "react";
import { render, screen } from "@testing-library/react";
import AdminUsersTable from "../components/AdminUsersTable";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Mock hooków useTheme i useMediaQuery używanych w komponencie
// Aby testy poprawnie działały w kontekście MUI theme
const theme = createTheme();

const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("AdminUsersTable", () => {
    test("renderuje nagłówki tabeli", () => {
        renderWithTheme(<AdminUsersTable users={[]} />);

        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Rola")).toBeInTheDocument();
    });

    test("pokazuje komunikat gdy lista użytkowników jest pusta", () => {
        renderWithTheme(<AdminUsersTable users={[]} />);
        expect(screen.getByText("Brak użytkowników do wyświetlenia")).toBeInTheDocument();
    });

    test("renderuje listę użytkowników", () => {
        const users = [
            { id: 1, username: "user1", email: "user1@example.com", role: "admin" },
            { id: 2, username: "user2", email: "user2@example.com", role: "user" },
        ];

        renderWithTheme(<AdminUsersTable users={users} />);

        expect(screen.getByText("user1")).toBeInTheDocument();
        expect(screen.getByText("user1@example.com")).toBeInTheDocument();
        expect(screen.getByText("admin")).toBeInTheDocument();

        expect(screen.getByText("user2")).toBeInTheDocument();
        expect(screen.getByText("user2@example.com")).toBeInTheDocument();
        expect(screen.getByText("user")).toBeInTheDocument();

        // Komunikat o braku użytkowników nie powinien się pojawić
        expect(screen.queryByText("Brak użytkowników do wyświetlenia")).not.toBeInTheDocument();
    });
});
