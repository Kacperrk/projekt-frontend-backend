import React from 'react';
import { Alert, Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CancelPage: React.FC = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/booklist');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
            p={2}
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 3, fontSize: '1.1rem' }}>
                    Przykro nam, coś poszło nie tak.<br />
                    Transakcja została odrzucona.
                </Alert>
                <Button variant="contained" color="primary" onClick={handleRetry}>
                    Spróbuj ponownie
                </Button>
            </Paper>
        </Box>
    );
};

export default CancelPage;
