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

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleRemove = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body1" align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {items.map((item) => (
            <React.Fragment key={item.itemId}>
              <ListItem alignItems="flex-start" sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
                <ListItemText
                  primary={`${item.title}`}
                  secondary={`Quantity: ${item.quantity} × $${item.unitPrice.toFixed(2)}`}
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
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;