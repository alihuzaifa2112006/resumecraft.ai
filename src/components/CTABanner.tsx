import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function CTABanner() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        background: "linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #1E88E5 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.05)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.05)",
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box textAlign="center">
          <Typography
            variant="h2"
            sx={{
              color: "white",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Supercharge Your Job Search With ResumeCraft
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.8)", mb: 4, maxWidth: 500, mx: "auto" }}
          >
            Join thousands of professionals who landed their dream jobs using
            our AI-powered resume builder.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "white",
                  color: "primary.dark",
                  fontWeight: 700,
                  px: 4,
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                Try for Free
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
