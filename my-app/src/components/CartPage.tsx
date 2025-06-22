import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeFromCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const items = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    navigate('/order-summary');
  };

  return (
      <Box sx={{ px: 2, py: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Koszyk
        </Typography>

        {items.length === 0 ? (
            <Typography variant="body1" align="center">
              Twój koszyk jest pusty
            </Typography>
        ) : (
            <List>
              {items.map((item) => (
                  <React.Fragment key={item.itemId}>
                    <ListItem
                        alignItems="flex-start"
                        sx={{ flexDirection: isMobile ? 'column' : 'row' }}
                    >
                      <ListItemText
                          primary={item.title}
                          secondary={`Ilość: ${item.quantity} × $${item.unitPrice.toFixed(2)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemove(item.itemId)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
              ))}
            </List>
        )}

        {items.length > 0 && (
            <Box sx={{ mt: 4, textAlign: 'right' }}>
              <Typography variant="h6">Suma: ${total.toFixed(2)}</Typography>
              <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleCheckout}
              >
                Przejdź do płatności
              </Button>
            </Box>
        )}
      </Box>
  );
};

export default CartPage;
