import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBooks } from '../slices/booksSlice';
import {
    Box,
    Grid,
    Typography,
    Container,
    CircularProgress,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox,
    Paper,
    Button,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FlipCard from './FlipCard';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector((state) => state.books.items);
    const loading = useAppSelector((state) => state.books.loading);
    const error = useAppSelector((state) => state.books.error);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const wordStartsWith = (text: string, query: string) =>
        text
            .toLowerCase()
            .split(/\s+/)
            .some((word) => word.startsWith(query.toLowerCase()));

    const categories = Array.from(
        new Set(
            books
                .map((b) => b.description)
                .filter((desc): desc is string => typeof desc === 'string' && desc !== '')
        )
    );

    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const filteredBooks = books
        .filter((book) => {
            const search = searchQuery.trim().toLowerCase();
            const matchesTitle = wordStartsWith(book.title, search);
            const matchesAuthor =
                wordStartsWith(book.authorFirstName, search) ||
                wordStartsWith(book.authorLastName, search);
            const available = onlyAvailable ? book.stockQuantity > 0 : true;
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.some(
                    (cat) => book.description?.toLowerCase() === cat.toLowerCase()
                );
            const matchesPrice =
                book.price >= priceRange[0] && book.price <= priceRange[1];

            return (!search || matchesTitle || matchesAuthor) &&
                available &&
                matchesCategory &&
                matchesPrice;
        })
        .sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

    return (
        <Container maxWidth="lg">
            <Box p={3} px={{ xs: 1, sm: 2, md: 3 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Książki dostępne w katalogu
                </Typography>

                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                    {/* Lewy panel */}
                    <Box sx={{ width: { xs: '100%', md: '20%' }, flexShrink: 0 }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="category-content"
                                id="category-header"
                            >
                                <Typography variant="h6">Kategorie</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    {categories.map((cat) => (
                                        <Grid item xs={12} key={cat}>
                                            <Paper
                                                elevation={selectedCategories.includes(cat) ? 6 : 2}
                                                sx={{
                                                    padding: 1,
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedCategories.includes(cat)
                                                        ? '#1976d2'
                                                        : '#f5f5f5',
                                                    color: selectedCategories.includes(cat)
                                                        ? '#fff'
                                                        : '#000',
                                                    '&:hover': {
                                                        backgroundColor: selectedCategories.includes(cat)
                                                            ? '#1565c0'
                                                            : '#e0e0e0',
                                                    },
                                                }}
                                                onClick={() => toggleCategory(cat)}
                                            >
                                                {cat}
                                            </Paper>
                                        </Grid>
                                    ))}
                                    {selectedCategories.length > 0 && (
                                        <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => setSelectedCategories([])}
                                            >
                                                Wyczyść kategorie
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        {/* Slider cenowy */}
                        <Box mt={4}>
                            <Typography gutterBottom>Cena (zł):</Typography>
                            <Slider
                                value={priceRange}
                                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                            />
                            <Typography variant="body2" align="center">
                                Zakres: {priceRange[0]} zł - {priceRange[1]} zł
                            </Typography>
                        </Box>
                    </Box>

                    {/* Prawy panel */}
                    <Box sx={{ width: { xs: '100%', md: '80%' } }}>
                        {/* Panel filtrowania */}
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            gap={2}
                            mb={2}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box display="flex" flex={1} gap={2}>
                                <TextField
                                    label="Szukaj książki lub autora"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    fullWidth
                                />
                                <FormControl sx={{ minWidth: 140 }}>
                                    <InputLabel>Sortuj po cenie</InputLabel>
                                    <Select
                                        value={sortOrder}
                                        label="Sortuj po cenie"
                                        onChange={(e) =>
                                            setSortOrder(e.target.value as 'asc' | 'desc')
                                        }
                                    >
                                        <MenuItem value="asc">Rosnąco</MenuItem>
                                        <MenuItem value="desc">Malejąco</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={onlyAvailable}
                                            onChange={(e) => setOnlyAvailable(e.target.checked)}
                                        />
                                    }
                                    label="Tylko dostępne"
                                />
                            </Box>

                            {/* Przełącznik widoku */}
                            <Box display="flex" alignItems="center" gap={1}>
                                <IconButton
                                    onClick={() => setViewMode('grid')}
                                    color={viewMode === 'grid' ? 'primary' : 'default'}
                                >
                                    <ViewModuleIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => setViewMode('list')}
                                    color={viewMode === 'list' ? 'primary' : 'default'}
                                >
                                    <ViewListIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        {/* Pasek podsumowania filtrów */}
                        <Box mb={3}>
                            <Typography variant="body2" color="textSecondary">
                                {`Filtry: ${searchQuery ? `Szukasz: "${searchQuery}", ` : ''}`}
                                {selectedCategories.length > 0
                                    ? `Kategorie: ${selectedCategories.join(', ')}, `
                                    : ''}
                                {`Cena: ${priceRange[0]} - ${priceRange[1]} zł`}
                                {onlyAvailable ? ', tylko dostępne' : ''}
                            </Typography>
                        </Box>

                        {loading && (
                            <Box display="flex" justifyContent="center" my={4}>
                                <CircularProgress />
                            </Box>
                        )}

                        {error && (
                            <Typography color="error" align="center">
                                {error}
                            </Typography>
                        )}

                        {!loading && !error && (
                            viewMode === 'grid' ? (
                                <Grid container spacing={3} justifyContent="center">
                                    {filteredBooks.map((book) => (
                                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                                            <FlipCard book={book} />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box display="flex" flexDirection="column" gap={2}>
                                    {filteredBooks.map((book) => (
                                        <Link
                                            to={`/book/${book.id}`}
                                            key={book.id}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Typography variant="h6" color="textPrimary">{book.title}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {book.authorFirstName} {book.authorLastName}
                                                </Typography>
                                                <Typography variant="body1">Cena: {book.price} zł</Typography>
                                                <Typography variant="body2">{book.description}</Typography>
                                                <Typography
                                                    variant="body2"
                                                    color={book.stockQuantity > 0 ? 'green' : 'red'}
                                                >
                                                    {book.stockQuantity > 0 ? 'Dostępna' : 'Brak na stanie'}
                                                </Typography>
                                            </Paper>
                                        </Link>
                                    ))}
                                </Box>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default BookList;
