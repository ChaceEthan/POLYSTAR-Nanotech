"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Cpu,
  Factory,
  GraduationCap,
  HardHat,
  Lightbulb,
  Network,
  PlugZap,
  RadioTower,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { COMPANY } from "@polystar/shared";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/use-platform-api";
import { trackEvent } from "@/lib/analytics";
import { industryImages, professionalImages, teamMembers } from "@/lib/public-content";

const services = [
  {
    icon: Factory,
    title: "Industrial Automation",
    text: "PLC, SCADA, instrumentation, process control, commissioning, and plant optimization.",
    tags: ["PLC", "SCADA", "Controls"],
    image: professionalImages.smartFactory,
    signal: "Closed-loop control"
  },
  {
    icon: Cpu,
    title: "Embedded Systems",
    text: "Firmware, electronics, edge controllers, sensors, prototypes, and product engineering.",
    tags: ["Firmware", "PCB", "Edge"],
    image: professionalImages.pcbDesign,
    signal: "Device-to-cloud ready"
  },
  {
    icon: RadioTower,
    title: "Industrial IoT",
    text: "Connected telemetry, gateways, dashboards, alerts, and predictive maintenance foundations.",
    tags: ["IIoT", "Telemetry", "Dashboards"],
    image: professionalImages.iotMonitoring,
    signal: "Live asset visibility"
  },
  {
    icon: PlugZap,
    title: "Electrical Engineering",
    text: "Power systems, panels, wiring, protection, diagnostics, and compliant field delivery.",
    tags: ["Power", "Panels", "Safety"],
    image: professionalImages.electricalInstallation,
    signal: "Safe field execution"
  },
  {
    icon: Building2,
    title: "Smart Infrastructure",
    text: "Monitoring and control systems for water, energy, buildings, transport, and public assets.",
    tags: ["Smart Cities", "Water", "Energy"],
    image: professionalImages.smartInfrastructure,
    signal: "Infrastructure intelligence"
  },
  {
    icon: Bot,
    title: "AI & Software",
    text: "Enterprise platforms, AI-assisted analytics, client portals, APIs, and IoT software.",
    tags: ["AI", "APIs", "Portals"],
    image: professionalImages.aiSolutions,
    signal: "Decision systems"
  },
  {
    icon: Lightbulb,
    title: "Research",
    text: "Nanotechnology, applied R&D, prototypes, laboratory validation, and pilot programs.",
    tags: ["R&D", "Labs", "Pilots"],
    image: professionalImages.nanotechnology,
    signal: "Prototype to pilot"
  },
  {
    icon: GraduationCap,
    title: "Training & Advisory",
    text: "Hands-on training, technical audits, feasibility studies, architecture, and delivery advisory.",
    tags: ["Workshops", "Audits", "Upskilling"],
    image: professionalImages.consulting,
    signal: "Capability transfer"
  }
];

const industries = ["Manufacturing", "Water Utilities", "Energy", "Agriculture", "Smart Buildings", "Transport", "Education", "Public Infrastructure"];

const projects = [
  { name: "AGROMETER", area: "AgriTech metering", text: "Smart agricultural measurement platform for field data, productivity tracking, and better operational decisions." },
  { name: "Smart Water Meter", area: "Smart infrastructure", text: "Connected water usage monitoring with telemetry, alerts, and analytics for utility visibility." },
  { name: "RFID Attendance", area: "Identity systems", text: "RFID-based attendance automation for schools, organizations, and controlled facilities." },
  { name: "Visitor Management", area: "Enterprise software", text: "Secure visitor registration, approval, reporting, and audit-ready front-desk workflows." },
  { name: "Fish Feed Drying Machine", area: "Industrial equipment", text: "Applied mechanical, electrical, and control engineering for aquaculture production support." }
];

const heroCounters = [
  { value: 42, suffix: "+", label: "Projects completed" },
  { value: 18, suffix: "+", label: "Clients served" },
  { value: 35, suffix: "+", label: "Technologies delivered" }
];

const stats = [
  ["8", "Engineering service lines"],
  ["5", "Featured product programs"],
  ["24/7", "Support-ready architecture"],
  ["RW", "Built from Kigali, Rwanda"]
];

const testimonials = [
  { quote: "POLYSTAR brings hardware, software, and field realities into one disciplined engineering conversation.", name: "Infrastructure Partner" },
  { quote: "Their technical approach makes complex automation projects easier for operational teams to trust and maintain.", name: "Industrial Client" }
];

const partners = ["Utilities", "Manufacturers", "Universities", "Government Programs", "Technology Vendors"];

const heroVisuals = [
  { image: professionalImages.robotics, title: "Robotics", icon: Bot },
  { image: professionalImages.pcbDesign, title: "PCB + embedded", icon: Cpu },
  { image: professionalImages.nanotechnology, title: "Nanotech lab", icon: Lightbulb }
];

const heroParticles = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 19) % 100}%`,
  delay: `${(index % 7) * 0.45}s`,
  duration: `${6 + (index % 5)}s`
}));

function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let frame = 0;
    const totalFrames = 56;
    const animation = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(value * Math.min(progress, 1)));
      if (frame >= totalFrames) window.clearInterval(animation);
    }, 22);

    return () => window.clearInterval(animation);
  }, [prefersReducedMotion, value]);

  return (
    <div className="hero-counter-tile">
      <div className="font-mono text-3xl font-semibold text-secondary sm:text-4xl">
        {count}
        {suffix}
      </div>
      <p className="mt-1 text-xs font-semibold uppercase text-slate-200">{label}</p>
    </div>
  );
}

export function HomePage() {
  const analytics = useAnalytics();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 700], [0, 90]);
  const visualY = useTransform(scrollY, [0, 700], [0, -58]);

  useEffect(() => {
    analytics.track.mutate({
      event: "page_view",
      path: "/",
      properties: { surface: "public_home" }
    });
  }, []);

  return (
    <>
      <section className="enterprise-hero relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-polystar-dark text-white">
        <motion.div className="absolute inset-0 -z-30" style={{ y: backgroundY }} aria-hidden="true">
          <Image
            src={professionalImages.smartFactory}
            alt="Engineers working around automated industrial technology"
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(11,15,25,0.94),rgba(10,46,93,0.75)_48%,rgba(11,15,25,0.9))]" />
        <div className="absolute inset-0 -z-10 industrial-grid opacity-35" aria-hidden="true" />
        <div className="hero-scanline absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {heroParticles.map((particle, index) => (
            <span
              key={index}
              className="hero-particle"
              style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }}
            />
          ))}
        </div>
        <div className="container grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div className="max-w-5xl" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="secondary">POLYSTAR NANOTECH LTD · Kigali, Rwanda</Badge>
            <h1 className="mt-5 max-w-5xl text-[length:var(--font-size-display)] font-semibold leading-none">
              Engineering Smart Solutions for Industry, Infrastructure & Innovation
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
              Advanced automation, embedded systems, AI, IoT, electrical engineering, nanotechnology research and industrial consulting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                onClick={() => trackEvent("request_quotation_click", { category: "cta", label: "hero" })}
              >
                <Link href="/get-quotation">
                  Request Quotation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 text-white hover:bg-white/15"
                onClick={() => trackEvent("explore_services_click", { category: "cta", label: "hero" })}
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroCounters.map((counter) => (
                <AnimatedCounter key={counter.label} {...counter} />
              ))}
            </div>
          </motion.div>
          <motion.div className="relative hidden min-h-[560px] lg:block" style={{ y: visualY }} aria-hidden="true">
            <div className="absolute left-8 top-4 h-72 w-72 border border-secondary/30 bg-white/5 backdrop-blur-sm" />
            <div className="absolute bottom-12 right-4 h-80 w-80 border border-accent/25 bg-polystar-dark/35 backdrop-blur-sm" />
            {heroVisuals.map((visual, index) => {
              const Icon = visual.icon;
              return (
                <motion.div
                  key={visual.title}
                  className="hero-visual-card"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 * index }}
                  style={{ top: `${index * 28 + 3}%`, left: `${index % 2 === 0 ? 6 : 34}%` }}
                >
                  <Image src={visual.image} alt="" fill sizes="320px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-polystar-dark/90 via-polystar-dark/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">{visual.title}</span>
                    <span className="grid h-10 w-10 place-items-center border border-white/25 bg-white/15 backdrop-blur">
                      <Icon className="h-5 w-5 text-secondary" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeading
            eyebrow="Company Overview"
            title="A Kigali-based engineering company built for real industrial environments."
            description={COMPANY.tagline}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {["Integrated hardware and software delivery", "Field-aware engineering documentation", "Cloud-ready data and analytics foundations", "Training and operational handover"].map((item) => (
              <div key={item} className="rounded-lg border bg-card p-5 text-sm font-medium shadow-sm">
                <ShieldCheck className="mb-4 h-5 w-5 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading
            eyebrow="Operational Domains"
            title="Engineering coverage across research, manufacturing, software, analytics, cloud, and consulting."
            description="POLYSTAR works across connected technical environments where field systems, data platforms, and people need to operate as one dependable system."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {industryImages.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border bg-card shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-secondary">{item.category}</p>
                  <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y engineering-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Core Services"
            title="Eight service lines, one engineering delivery system."
            description="POLYSTAR connects controls, electrical engineering, firmware, software, and operations into maintainable systems."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="feature-card group overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} visual`}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-polystar-dark/85 via-polystar-dark/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="secondary">{service.signal}</Badge>
                    <span className="grid h-10 w-10 place-items-center border border-white/25 bg-white/15 text-white backdrop-blur">
                      <service.icon className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{service.text}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-md border bg-muted px-2 py-2 text-center text-xs font-semibold text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container">
          <SectionHeading eyebrow="Industries Served" title="Engineering support for sectors where uptime, visibility, and safety matter." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry} className="rounded-lg border bg-card p-5 text-sm font-semibold">
                <HardHat className="mb-4 h-5 w-5 text-primary" />
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Featured Projects" title="Applied innovation with visible field value." />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {projects.map((project) => (
              <Card key={project.name}>
                <CardHeader>
                  <Badge variant="outline">{project.area}</Badge>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{project.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-polystar-navy text-white">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="secondary">Software Development</Badge>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Enterprise platforms that connect engineering assets to business decisions.</h2>
            <p className="mt-4 max-w-2xl text-slate-200">
              Client portals, dashboards, APIs, analytics, workflow systems, and IoT applications engineered with secure architecture and maintainable code.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Admin dashboards", "Client portals", "IoT telemetry", "REST APIs", "Analytics", "Reports"].map((item) => (
              <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-4 text-sm font-semibold">
                <BarChart3 className="mb-3 h-5 w-5 text-secondary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Research & Innovation"
            title="Prototype, test, and scale new technology programs."
            description="From AGROMETER to smart metering and production equipment, POLYSTAR turns research ideas into usable engineering systems."
          />
          <div className="rounded-lg border bg-card p-6 shadow-enterprise">
            <Lightbulb className="h-8 w-8 text-accent" />
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Our innovation practice supports feasibility studies, technical architecture, product development, laboratory validation, and pilot deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container">
          <SectionHeading
            eyebrow="Team"
            title="A professional delivery structure for leadership, engineering, operations, and consulting."
            description="A focused delivery model keeps technical accountability clear from planning through commissioning and support."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={`${member.group}-${member.role}`}>
                <CardHeader>
                  <Badge variant="outline">{member.group}</Badge>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-primary">{member.role}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{member.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-12">
        <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <Card key={label}>
              <CardContent className="p-6">
                <div className="text-3xl font-semibold text-primary">{value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-y bg-background">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Trusted for practical engineering judgment." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Card key={item.name}>
                <CardContent className="p-6">
                  <p className="text-lg leading-8">"{item.quote}"</p>
                  <p className="mt-5 text-sm font-semibold text-muted-foreground">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container">
          <SectionHeading eyebrow="Partners" title="Built for collaboration across technical ecosystems." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((partner) => (
              <div key={partner} className="rounded-lg border bg-card p-5 text-center text-sm font-semibold">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-polystar-dark text-white">
        <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge variant="secondary">Contact CTA</Badge>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">Ready to engineer your next industrial or infrastructure system?</h2>
            <p className="mt-4 max-w-2xl text-slate-300">Talk to POLYSTAR Nanotech Ltd about automation, IoT, software, electrical systems, consulting, or training.</p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            onClick={() => trackEvent("contact_cta_click", { category: "cta", label: "footer_home" })}
          >
            <Link href="/contact">
              Contact POLYSTAR <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
