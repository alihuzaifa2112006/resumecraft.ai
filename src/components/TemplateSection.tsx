import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TemplatePreview() {
  const templates = [
    { name: "Modern", active: true },
    { name: "Classic", active: false },
    { name: "Creative", active: false },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="body2" fontWeight={600} color="text.primary" mb={2}>
        Choose your Template
      </Typography>
      <Stack direction="row" spacing={1} mb={2.5}>
        {templates.map((t) => (
          <Chip
            key={t.name}
            label={t.name}
            variant={t.active ? "filled" : "outlined"}
            color={t.active ? "primary" : "default"}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        ))}
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          bgcolor: "#F8FAFC",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.100",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.main",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ height: 10, bgcolor: "grey.300", borderRadius: 1, mb: 0.5, width: "60%" }} />
            <Box sx={{ height: 7, bgcolor: "grey.200", borderRadius: 1, width: "40%" }} />
          </Box>
        </Box>

        <Box sx={{ borderLeft: "3px solid", borderColor: "primary.main", pl: 2, mb: 2 }}>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                height: 6,
                bgcolor: "grey.200",
                borderRadius: 1,
                mb: 0.5,
                width: `${90 - i * 10}%`,
              }}
            />
          ))}
        </Box>

        <Grid container spacing={1}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={6} key={i}>
              <Box sx={{ height: 6, bgcolor: "grey.200", borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Paper>
  );
}

export default function TemplateSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TemplatePreview />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2.5,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Start With Professional{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Resume Design Template
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Choose from our collection of professionally designed resume
              templates. Each template is crafted to be recruiter-friendly and
              visually appealing.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Customize colors, fonts, and layouts to match your personal brand
              while maintaining a professional look that recruiters love.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4 }}
            >
              Browse Templates
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
