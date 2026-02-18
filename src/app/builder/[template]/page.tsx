import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AIBuilderSection from "../../../components/AIBuilderSection";

export default function BuilderPage({ params }: { params: { template: string } }) {
  const template = params.template;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Building AI Resume — {template}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          The AI builder will guide you through content suggestions and formatting.
        </Typography>
      </Container>

      <AIBuilderSection />
    </Box>
  );
}
