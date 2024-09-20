import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Paper } from "@mui/material";
import Quote from "./components/Quote/Quote";
import axios from "axios";

const App: React.FC = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string }>({
    quote: "",
    author: "",
  });

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "/api/api/1.0/?method=getQuote&key=random&format=jsonp&lang=ru&jsonp=?"
      );

      const data = response.data;
      const jsonResponse = data.slice(
        data.indexOf("(") + 1,
        data.lastIndexOf(")")
      );
      const quoteData = JSON.parse(jsonResponse);

      setQuote({ quote: quoteData.quoteText, author: quoteData.quoteAuthor });
    } catch (error) {
      console.error("Ошибка при получении цитаты:", error);
    }
  };

  const changeBackgroundColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
    document.body.style.transition = "background-color 0.5s";
  };

  useEffect(() => {
    fetchQuote();
    changeBackgroundColor();
  }, []);

  return (
    <Container maxWidth="sm" style={{ padding: "20px" }}>
      <Paper elevation={3} style={{ padding: "16px", marginTop: "20px" }}>
        <Typography variant="h4" align="center">
          Random Quote Machine
        </Typography>
        <Quote quote={quote.quote} author={quote.author} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            fetchQuote();
            changeBackgroundColor();
          }}
          style={{ marginTop: "16px" }}
        >
          Новая цитата
        </Button>
      </Paper>
    </Container>
  );
};

export default App;
