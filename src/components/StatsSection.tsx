import { Box, Container, Typography, Stack, Divider } from "@mui/material";

const stats = [
  { value: "60.98%", label: "Matching Rate", sub: "Average ATS match score" },
  { value: "8.25/10", label: "Avg Score", sub: "Average resume quality score" },
  { value: "~1.8k", label: "Resumes Built", sub: "Total resumes created to date" },
];

export default function StatsSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
          }
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {stats.map((stat) => (
            <Box key={stat.label} textAlign="center" sx={{ minWidth: 200 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: "text.primary",
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  mb: 0.5,
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body1" fontWeight={600} color="text.primary">
                {stat.label}
              </Typography>
              <Typography variant="body2">{stat.sub}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
