import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    avatar: "SM",
    rating: 5,
    text: "The amount of information I got using ResumeCraft helped me improve my resume so much. It's still a Work in Progress, T.J. but now I'm getting more calls for interviews, and that's all that matters.",
  },
  {
    name: "James Rodriguez",
    avatar: "JR",
    role: "Software Developer",
    rating: 5,
    text: "I had no clue what formatting tools would help me fix my resume. ResumeCraft's AI suggested so many great changes, and within a day, I got a call for my perfect job. Thanks ResumeCraft!",
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            mb: 6,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                mb: 1,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Our Customers Love
            </Typography>
            <Typography variant="body1">
              Real results from real people who transformed their careers with
              ResumeCraft.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: "grey.300",
              color: "text.primary",
              whiteSpace: "nowrap",
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            See All Reviews
          </Button>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid size={{ xs: 12, md: 6 }} key={testimonial.name}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.100",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "primary.light",
                    boxShadow: "0 8px 30px rgba(21,101,192,0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: "text.secondary",
                      fontStyle: "italic",
                      lineHeight: 1.8,
                    }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        width: 44,
                        height: 44,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="text.primary">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
