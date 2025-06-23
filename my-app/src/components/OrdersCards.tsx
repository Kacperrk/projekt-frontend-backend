import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";

interface Order {
  id: number;
  userEmail: string;
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: string;
  totalPrice: number;
  city: string;
}

interface Props {
  orders: Order[];
}

const statusColors: Record<Order["status"], "default" | "success" | "error" | "warning"> = {
  Pending: "warning",
  Completed: "success",
  Cancelled: "error",
};

const OrdersCards: React.FC<Props> = ({ orders }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (orders.length === 0)
    return (
      <Typography variant="body1" color="text.secondary" align="center" mt={4}>
        Brak zamówień do wyświetlenia.
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} sm={6} md={4} key={order.id}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 3,
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight="bold">
                  Zamówienie #{order.id}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Klient: {order.userEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Miasto: {order.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data: {new Date(order.orderDate).toLocaleDateString()}
                </Typography>

                <Chip
                  label={order.status}
                  color={statusColors[order.status]}
                  variant="outlined"
                  size="small"
                  sx={{ width: "fit-content", mt: 1 }}
                />

                <Typography variant="subtitle1" fontWeight="medium" mt={1}>
                  Kwota: {order.totalPrice.toFixed(2)} zł
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdersCards;
