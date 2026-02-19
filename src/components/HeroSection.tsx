"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

const RESUME_DATA = {
  name: "John Doe",
  tagline: "Software engineer obsessed with building exceptional products that people love",
  email: "hello@openresume.com",
  phone: "123-456-7890",
  location: "NYC, NY",
  linkedin: "linkedin.com/in/john-doe",
  experiences: [
    {
      company: "ABC Company",
      role: "Software Engineer",
      date: "May 2023 - Present",
      bullets: [
        "Lead a cross-functional team of 5 engineers in developing a search bar, which enables thousands of daily active users to search content across the entire platform",
        "Create stunning home page product demo animations that drives up sign up rate by 20%",
        "Write clean code that is modular and easy to maintain while ensuring 100% test coverage",
      ],
    },
    {
      company: "DEF Organization",
      role: "Software Engineer Intern",
      date: "Summer 2022",
      bullets: [
        "Re-architected the existing content editor to be mobile responsive, enabling 10k+ mobile users to access the platform",
      ],
    },
  ],
  education: {
    school: "XYZ University",
    degree: "Bachelor of Science in Computer Science",
    date: "Sep 2019 - May 2023",
    gpa: "3.9 / 4.0",
  },
  skills: [
    { label: "Languages", value: "TypeScript, Python, Java, C++" },
    { label: "Frameworks", value: "React, Next.js, Node.js, Express" },
    { label: "Tools", value: "Git, Docker, AWS, PostgreSQL" },
  ],
};

function useSequentialTyping() {
  const [phase, setPhase] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const phases = [
    { text: RESUME_DATA.name, speed: 60 },
    { text: RESUME_DATA.tagline, speed: 18 },
    { text: "contacts", speed: 0 },
    { text: RESUME_DATA.experiences[0].company, speed: 35 },
    { text: RESUME_DATA.experiences[0].role, speed: 30 },
    { text: RESUME_DATA.experiences[0].bullets[0], speed: 8 },
    { text: RESUME_DATA.experiences[0].bullets[1], speed: 8 },
    { text: RESUME_DATA.experiences[0].bullets[2], speed: 8 },
    { text: RESUME_DATA.experiences[1].company, speed: 35 },
    { text: RESUME_DATA.experiences[1].role, speed: 30 },
    { text: RESUME_DATA.experiences[1].bullets[0], speed: 8 },
    { text: "education", speed: 0 },
    { text: "skills", speed: 0 },
  ];

  useEffect(() => {
    if (phase >= phases.length) {
      setIsTyping(false);
      const restartTimer = setTimeout(() => {
        setPhase(0);
        setCharIndex(0);
        setIsTyping(true);
      }, 5000);
      return () => clearTimeout(restartTimer);
    }

    const current = phases[phase];

    if (current.speed === 0) {
      const timeout = setTimeout(() => {
        setPhase((p) => p + 1);
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }

    if (charIndex >= current.text.length) {
      const timeout = setTimeout(() => {
        setPhase((p) => p + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCharIndex((c) => c + 1);
    }, current.speed);

    return () => clearTimeout(timeout);
  }, [phase, charIndex]);

  const getTypedText = useCallback(
    (phaseIndex: number) => {
      if (phase > phaseIndex) return phases[phaseIndex].text;
      if (phase === phaseIndex) return phases[phaseIndex].text.slice(0, charIndex);
      return "";
    },
    [phase, charIndex]
  );

  const isPhaseVisible = useCallback(
    (phaseIndex: number) => phase >= phaseIndex,
    [phase]
  );

  const isPhaseActive = useCallback(
    (phaseIndex: number) => phase === phaseIndex,
    [phase]
  );

  return { getTypedText, isPhaseVisible, isPhaseActive, isTyping };
}

function Cursor({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        width: "2px",
        height: "1em",
        bgcolor: "#38BDF8",
        ml: "1px",
        verticalAlign: "text-bottom",
        animation: "blink 1s step-end infinite",
        "@keyframes blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      }}
    />
  );
}

function AnimatedResumePreview() {
  const { getTypedText, isPhaseVisible, isPhaseActive } = useSequentialTyping();

  const accentColor = "#38BDF8";

  return (
    <Paper
      elevation={12}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "white",
        maxWidth: 480,
        mx: "auto",
        border: "1px solid",
        borderColor: "grey.200",
      }}
    >
      {/* Top accent bar */}
      <Box sx={{ height: 6, bgcolor: accentColor }} />

      <Box sx={{ p: { xs: 2.5, sm: 3 }, pt: { xs: 2, sm: 2.5 } }}>
        {/* Name */}
        <Typography
          sx={{
            fontSize: { xs: "1.4rem", sm: "1.6rem" },
            fontWeight: 700,
            color: accentColor,
            lineHeight: 1.2,
            minHeight: "1.6rem",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {getTypedText(0)}
          <Cursor active={isPhaseActive(0)} />
        </Typography>

        {/* Tagline */}
        <Typography
          sx={{
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            color: "text.secondary",
            mt: 0.5,
            minHeight: "1rem",
            lineHeight: 1.4,
          }}
        >
          {getTypedText(1)}
          <Cursor active={isPhaseActive(1)} />
        </Typography>

        {/* Contact Row */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1, sm: 1.5 },
            mt: 1,
            opacity: isPhaseVisible(2) ? 1 : 0,
            transform: isPhaseVisible(2) ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.4s ease",
          }}
        >
          {[
            { icon: <EmailOutlinedIcon sx={{ fontSize: 12 }} />, text: RESUME_DATA.email },
            { icon: <PhoneOutlinedIcon sx={{ fontSize: 12 }} />, text: RESUME_DATA.phone },
            { icon: <LocationOnOutlinedIcon sx={{ fontSize: 12 }} />, text: RESUME_DATA.location },
            { icon: <LinkedInIcon sx={{ fontSize: 12 }} />, text: RESUME_DATA.linkedin },
          ].map((c, i) => (
            <Stack key={i} direction="row" spacing={0.3} alignItems="center">
              <Box sx={{ color: "text.secondary", display: "flex" }}>{c.icon}</Box>
              <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>{c.text}</Typography>
            </Stack>
          ))}
        </Box>

        {/* WORK EXPERIENCE */}
        {isPhaseVisible(3) && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
              <Box sx={{ width: 16, height: 2.5, bgcolor: accentColor, borderRadius: 1 }} />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "text.primary",
                }}
              >
                Work Experience
              </Typography>
            </Stack>

            {/* Experience 1 */}
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary" }}>
                  {getTypedText(3)}
                  <Cursor active={isPhaseActive(3)} />
                </Typography>
                {isPhaseVisible(4) && (
                  <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", flexShrink: 0, ml: 1 }}>
                    {RESUME_DATA.experiences[0].date}
                  </Typography>
                )}
              </Box>
              {isPhaseVisible(4) && (
                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mb: 0.3 }}>
                  {getTypedText(4)}
                  <Cursor active={isPhaseActive(4)} />
                </Typography>
              )}
              {[5, 6, 7].map((p, idx) =>
                isPhaseVisible(p) ? (
                  <Stack key={idx} direction="row" spacing={0.5} sx={{ mt: 0.2 }}>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", lineHeight: 1.4, flexShrink: 0 }}>•</Typography>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", lineHeight: 1.4 }}>
                      {getTypedText(p)}
                      <Cursor active={isPhaseActive(p)} />
                    </Typography>
                  </Stack>
                ) : null
              )}
            </Box>

            {/* Experience 2 */}
            {isPhaseVisible(8) && (
              <Box sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary" }}>
                    {getTypedText(8)}
                    <Cursor active={isPhaseActive(8)} />
                  </Typography>
                  {isPhaseVisible(9) && (
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", flexShrink: 0, ml: 1 }}>
                      {RESUME_DATA.experiences[1].date}
                    </Typography>
                  )}
                </Box>
                {isPhaseVisible(9) && (
                  <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mb: 0.3 }}>
                    {getTypedText(9)}
                    <Cursor active={isPhaseActive(9)} />
                  </Typography>
                )}
                {isPhaseVisible(10) && (
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.2 }}>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", lineHeight: 1.4, flexShrink: 0 }}>•</Typography>
                    <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", lineHeight: 1.4 }}>
                      {getTypedText(10)}
                      <Cursor active={isPhaseActive(10)} />
                    </Typography>
                  </Stack>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* EDUCATION */}
        {isPhaseVisible(11) && (
          <Box
            sx={{
              mt: 1.5,
              opacity: isPhaseVisible(11) ? 1 : 0,
              transform: isPhaseVisible(11) ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.4s ease",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
              <Box sx={{ width: 16, height: 2.5, bgcolor: accentColor, borderRadius: 1 }} />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "text.primary",
                }}
              >
                Education
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary" }}>
                {RESUME_DATA.education.school}
              </Typography>
              <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
                {RESUME_DATA.education.date}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
              {RESUME_DATA.education.degree}
            </Typography>
            <Typography sx={{ fontSize: "0.65rem", color: "text.secondary" }}>
              GPA: {RESUME_DATA.education.gpa}
            </Typography>
          </Box>
        )}

        {/* SKILLS */}
        {isPhaseVisible(12) && (
          <Box
            sx={{
              mt: 1.5,
              opacity: isPhaseVisible(12) ? 1 : 0,
              transform: isPhaseVisible(12) ? "translateY(0)" : "translateY(8px)",
              transition: "all 0.4s ease",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={0.8}>
              <Box sx={{ width: 16, height: 2.5, bgcolor: accentColor, borderRadius: 1 }} />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: "text.primary",
                }}
              >
                Skills
              </Typography>
            </Stack>
            {RESUME_DATA.skills.map((s, i) => (
              <Stack key={i} direction="row" spacing={0.5} sx={{ mb: 0.2 }}>
                <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, color: "text.primary", minWidth: 65 }}>
                  {s.label}:
                </Typography>
                <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
                  {s.value}
                </Typography>
              </Stack>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default function HeroSection() {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)",
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="AI-Powered Resume Builder"
              sx={{
                bgcolor: "#E3F2FD",
                color: "primary.main",
                fontWeight: 600,
                mb: 3,
                fontSize: "0.8rem",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: "text.primary",
                mb: 2.5,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
              }}
            >
              Smart{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Resume Builder
              </Box>{" "}
              for Modern Careers
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 480 }}>
              Create professional resumes, get AI-powered scoring, and land your
              dream job. ResumeCraft helps you stand out.
            </Typography>
            <Stack direction="row" spacing={2} mb={3}>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large">
                  Get Started
                </Button>
              </Link>
            </Stack>
            <Stack direction="row" spacing={3}>
              {["AI Scoring", "Smart Builder", "Free Templates"].map((item) => (
                <Stack key={item} direction="row" spacing={0.5} alignItems="center">
                  <CheckCircleIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <AnimatedResumePreview />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
