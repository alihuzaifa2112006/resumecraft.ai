import React from "react";
import Link from "next/link";
import { Box, Container, Typography, Button, Paper, Chip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const TEMPLATES: Record<string, { title: string; description: string }> = {
  modern: { title: "Modern", description: "Clean, recruiter-friendly layout." },
  classic: { title: "Classic", description: "Traditional two-column CV." },
  creative: { title: "Creative", description: "Visual layout for designers." },
};

// Modern Template - Software Engineer
function ModernTemplate() {
  return (
    <Box sx={{ bgcolor: "white", p: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, pb: 3, borderBottom: "2px solid #2563EB" }}>
        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <Box sx={{ width: 80, height: 80, bgcolor: "#2563EB", borderRadius: 1, flexShrink: 0 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={800} mb={0.5}>
              Priya Sharma
            </Typography>
            <Typography variant="h6" fontWeight={600} color="#2563EB" mb={1}>
              Senior Software Engineer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📧 priya.sharma@techmail.com · 📱 +91-9876543210 · 📍 Bangalore, India · 🔗 linkedin.com/in/priyasharma
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Professional Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={1} sx={{ color: "#2563EB" }}>
          PROFESSIONAL SUMMARY
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          Innovative Software Engineer with 6+ years specializing in backend systems and cloud infrastructure. Proven expertise in designing scalable APIs, optimizing database performance, and implementing DevOps best practices. Strong track record of leading technical initiatives that improve system reliability and reduce operational costs.
        </Typography>
      </Box>

      {/* Experience */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB" }}>
          EXPERIENCE
        </Typography>
        
        {[
          {
            title: "Senior Software Engineer",
            company: "CloudTech Solutions",
            period: "2022 - Present",
            points: [
              "Architected distributed system processing 10M+ API calls daily with 99.9% uptime",
              "Reduced infrastructure costs by 35% through optimization and automation",
              "Led team of 4 engineers in redesigning payment processing pipeline"
            ]
          },
          {
            title: "Software Engineer",
            company: "DataFlow Systems",
            period: "2019 - 2022",
            points: [
              "Developed real-time analytics engine handling 500GB+ daily data ingestion",
              "Implemented automated testing framework improving code coverage to 85%",
              "Collaborated with ML team to integrate predictive models into production systems"
            ]
          },
          {
            title: "Junior Developer",
            company: "StartupHub",
            period: "2017 - 2019",
            points: [
              "Built REST APIs for e-commerce platform serving 100K+ users",
              "Optimized SQL queries reducing response time by 60%"
            ]
          }
        ].map((job, idx) => (
          <Box key={idx} sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {job.period}
              </Typography>
            </Box>
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              {job.points.map((point, pidx) => (
                <Typography component="li" variant="body2" key={pidx} sx={{ mb: 0.5, color: "text.secondary" }}>
                  {point}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Education */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB" }}>
          EDUCATION
        </Typography>
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="subtitle1" fontWeight={700}>
              B.Tech in Computer Science & Engineering
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              2015 - 2017
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Indian Institute of Technology, Delhi · CGPA: 7.9/10.0
          </Typography>
        </Box>
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB" }}>
          TECHNICAL SKILLS
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "Python",
            "Java",
            "Go",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Kubernetes",
            "Docker",
            "AWS",
            "Microservices",
            "Apache Kafka",
            "Git"
          ].map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                bgcolor: "#E0E7FF",
                color: "#2563EB",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Certifications */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB" }}>
          CERTIFICATIONS & AWARDS
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • AWS Solutions Architect Associate (2021) · • Kubernetes Administrator (2022) · • Technology Excellence Award (2023)
        </Typography>
      </Box>
    </Box>
  );
}

// Classic Template - Product Manager
function ClassicTemplate() {
  return (
    <Box sx={{ bgcolor: "white", p: { xs: 3, md: 4 } }}>
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Left Column */}
        <Box sx={{ flex: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 3, pb: 3, borderBottom: "1px solid #e5e7eb" }}>
            <Typography variant="h3" fontWeight={800} mb={0.5}>
              Arjun Mehta
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              arjun.mehta@business.com · +91-9123456789 · Mumbai, India
            </Typography>
          </Box>

          {/* Professional Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Strategic product leader with 8+ years driving product strategy and go-to-market initiatives for SaaS and mobile applications. Expert in user research, market analysis, and cross-functional collaboration. Proven ability to scale products from 10K to 1M+ users while maintaining 90%+ customer satisfaction.
            </Typography>
          </Box>

          {/* Experience */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} sx={{ fontSize: "0.95rem" }}>
              EXPERIENCE
            </Typography>
            
            {[
              { 
                title: "Senior Product Manager", 
                company: "FinTech Innovations Pvt Ltd", 
                period: "2022 - Present",
                points: "Led product roadmap for investment platform with 500K+ active users · Increased MAU by 45% through feature optimization · Managed cross-functional team of designers and engineers"
              },
              { 
                title: "Product Manager", 
                company: "E-Learning Pro", 
                period: "2020 - 2022",
                points: "Launched 5 major product features generating $2M ARR · Reduced churn rate from 8% to 3% through user engagement initiatives"
              },
              {
                title: "Associate Product Manager",
                company: "StartupVentures",
                period: "2018 - 2020",
                points: "Analyzed market data to identify growth opportunities · Collaborated with engineering on technical product decisions"
              }
            ].map((job, idx) => (
              <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx === 2 ? "none" : "1px solid #e5e7eb" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" fontWeight={700}>
                    {job.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {job.period}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  {job.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.points}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Education */}
          <Box>
            <Typography variant="subtitle2" fontWeight={800} mb={1} sx={{ fontSize: "0.95rem" }}>
              EDUCATION
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" fontWeight={700}>
                MBA in Business Administration
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                2016 - 2018
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
              XLRI Jamshedpur, GPA: 8.5/10
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" fontWeight={700}>
                B.Tech in Electronics & Communication
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                2012 - 2016
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              NIT Rourkela, CGPA: 7.8/10
            </Typography>
          </Box>
        </Box>

        {/* Right Sidebar */}
        <Box sx={{ flex: 1, bgcolor: "#f9fafb", p: 2, borderRadius: 1, height: "fit-content" }}>
          {/* Core Competencies */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} sx={{ fontSize: "0.9rem" }}>
              KEY COMPETENCIES
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                "Product Strategy",
                "User Research",
                "Market Analysis",
                "Roadmap Planning",
                "A/B Testing",
                "Data Analytics"
              ].map((comp) => (
                <Typography key={comp} variant="caption" color="text.secondary">
                  • {comp}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Tools & Platforms */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} sx={{ fontSize: "0.9rem" }}>
              TOOLS & PLATFORMS
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              • Mixpanel · Intercom
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              • Figma · JIRA
            </Typography>
            <Typography variant="caption" color="text.secondary">
              • Tableau · Google Analytics
            </Typography>
          </Box>

          {/* Languages */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} sx={{ fontSize: "0.9rem" }}>
              LANGUAGES
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              • English (Native)
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              • Hindi (Native)
            </Typography>
          </Box>

          {/* Certifications */}
          <Box>
            <Typography variant="subtitle2" fontWeight={800} mb={1} sx={{ fontSize: "0.9rem" }}>
              CERTIFICATIONS
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              • Google Analytics IQ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Creative Template - UX/UI Designer
function CreativeTemplate() {
  return (
    <Box sx={{ bgcolor: "white", p: { xs: 3, md: 4 } }}>
      {/* Gradient Header */}
      <Box sx={{
        background: "linear-gradient(135deg, #2563EB 0%, #1e40af 100%)",
        p: 3,
        borderRadius: 2,
        color: "white",
        mb: 3
      }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          <Box sx={{ width: 70, height: 70, bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
          <Box>
            <Typography variant="h3" fontWeight={800} mb={0.5}>
              Sophia Chen
            </Typography>
            <Typography variant="h6" fontWeight={500} sx={{ opacity: 0.9 }}>
              Creative UX/UI Designer & Brand Strategist
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Contact & Links */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3, pb: 3, borderBottom: "1px solid #e5e7eb" }}>
        <Chip label="sophia.chen@creative.com" variant="outlined" />
        <Chip label="+1 (415) 555-0199" variant="outlined" />
        <Chip label="San Francisco, CA" variant="outlined" />
        <Chip label="dribbble.com/sophiachen" variant="outlined" />
      </Box>

      {/* Professional Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={1} sx={{ color: "#2563EB", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 4, height: 4, bgcolor: "#2563EB", borderRadius: "50%" }} />
          ABOUT ME
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          Award-winning designer passionate about creating beautiful, intuitive digital experiences. With 5+ years in UX/UI design, I specialize in user research, interaction design, and translating complex problems into elegant solutions. Collaborator at heart, I thrive in cross-functional teams and love mentoring junior designers.
        </Typography>
      </Box>

      {/* Featured Work */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 4, height: 4, bgcolor: "#2563EB", borderRadius: "50%" }} />
          SELECTED WORK
        </Typography>

        {[
          { 
            title: "FinVest Mobile App", 
            role: "Lead UX Designer",
            impact: "Redesigned app interface, achieving 92% user satisfaction & 3.2M downloads",
            year: "2023"
          },
          { 
            title: "Health+ Dashboard", 
            role: "Product Designer",
            impact: "Created accessible health monitoring interface with 95% task completion rate",
            year: "2022"
          },
          { 
            title: "Brand Identity System",
            role: "Creative Director",
            impact: "Developed comprehensive design system used by 15+ internal teams",
            year: "2021"
          }
        ].map((project, idx) => (
          <Box key={idx} sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: "#f9fafb", 
            borderRadius: 1,
            borderLeft: "4px solid #2563EB"
          }}>
            <Typography variant="subtitle1" fontWeight={700}>
              {project.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
              {project.role} · {project.year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.impact}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Design Expertise */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 4, height: 4, bgcolor: "#2563EB", borderRadius: "50%" }} />
          DESIGN EXPERTISE
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "User Research", "Wireframing", "Prototyping", "UI Design", "Motion Design",
            "Design Systems", "Accessibility", "User Testing", "Interaction Design", "Brand Design"
          ].map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                bgcolor: "#E0E7FF",
                color: "#2563EB",
                fontWeight: 600,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Tools & Software */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 4, height: 4, bgcolor: "#2563EB", borderRadius: "50%" }} />
          TOOLS & SOFTWARE
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[
            "Figma", "Adobe XD", "Sketch", "Illustrator", "Photoshop",
            "Protopie", "Framer", "Adobe After Effects", "InVision", "Notion"
          ].map((tool) => (
            <Chip
              key={tool}
              label={tool}
              variant="outlined"
              sx={{
                color: "#2563EB",
                borderColor: "#E0E7FF",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Awards */}
      <Box>
        <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: "#2563EB", display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 4, height: 4, bgcolor: "#2563EB", borderRadius: "50%" }} />
          AWARDS & RECOGNITION
        </Typography>
        <Typography variant="body2" color="text.secondary">
          🏆 Dribbble Best Design Award 2023 · 🎨 Digital Design Excellence Award 2022 · ⭐ Top 30 UX Designers Under 30 (Design Community)
        </Typography>
      </Box>
    </Box>
  );
}

export default function TemplatePreviewPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const meta = TEMPLATES[id] || { title: id, description: "Template preview" };

  function renderTemplate(templateId: string) {
    switch (templateId) {
      case "modern":
        return <ModernTemplate />;
      case "classic":
        return <ClassicTemplate />;
      case "creative":
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Preview — {meta.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {meta.description}
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ border: "1px solid", borderColor: "grey.200", borderRadius: 2, overflow: "hidden", mb: 4 }}>
          {renderTemplate(id)}
        </Paper>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/templates">
            <Button variant="outlined">
              ← Back to Templates
            </Button>
          </Link>
          <Link href={`/builder/${id}`}>
            <Button variant="contained" startIcon={<FileDownloadIcon />}>
              Use This Template
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
