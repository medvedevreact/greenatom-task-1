import React from "react";
import { Typography } from "@mui/material";

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div>
      <Typography variant="h6" align="center" style={{ margin: "16px 0" }}>
        "{quote}"
      </Typography>
      <Typography variant="body1" align="center">
        - {author}
      </Typography>
    </div>
  );
};

export default Quote;
