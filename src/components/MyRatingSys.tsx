import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import convertRound from './convertRound';

export const MyRatingSys: FC<{ HereRating: number }> = ({ HereRating }) => {
  const [valueRating, setValue] = React.useState<number | null>(HereRating);

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating name="read-only" value={convertRound(valueRating ?? 0)} readOnly />
    </Box>
  );
};

export default MyRatingSys;