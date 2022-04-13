import { FC } from "react";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
    currentValue: number;
    maxValue: number;

    //Methods
    updatedQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity, maxValue }) => {

    const handleIncrement = () => {
        if (currentValue < maxValue) {
            updatedQuantity(currentValue + 1);
        }
    };
    const handleDecrement = () => {
        if (currentValue > 1) {
            updatedQuantity(currentValue - 1);
        }
    };

    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={handleDecrement}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
            <IconButton onClick={handleIncrement}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
