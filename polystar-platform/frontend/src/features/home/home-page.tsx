"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
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
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/use-platform-api";
import { trackEvent } from "@/lib/analytics";
import { industryImages, teamMembers } from "@/lib/public-content";

const services = [
  { icon: Factory, title: "Industrial Automation", text: "PLC, SCADA, instrumentation, process control, commissioning, and plant optimization.", tags: ["PLC", "SCADA", "Controls"] },
  { icon: Cpu, title: "Embedded Systems", text: "Firmware, electronics, edge controllers, sensors, prototypes, and product engineering.", tags: ["Firmware", "PCB", "Edge"] },
  { icon: RadioTower, title: "Industrial IoT", text: "Connected telemetry, gateways, dashboards, alerts, and predictive maintenance foundations.", tags: ["IIoT", "Telemetry", "Dashboards"] },
  { icon: PlugZap, title: "Electrical Engineering", text: "Power systems, panels, wiring, protection, diagnostics, and compliant field delivery.", tags: ["Power", "Panels", "Safety"] },
  { icon: Building2, title: "Smart Infrastructure", text: "Monitoring and control systems for water, energy, buildings, transport, and public assets.", tags: ["Smart Cities", "Water", "Energy"] },
  { icon: Bot, title: "Software Development", text: "Enterprise web platforms, client portals, APIs, analytics systems, and IoT software.", tags: ["Platforms", "APIs", "Portals"] },
  { icon: Wrench, title: "Consultancy", text: "Technical audits, feasibility studies, architecture, procurement support, and delivery advisory.", tags: ["Audits", "Architecture", "Advisory"] },
  { icon: GraduationCap, title: "Training", text: "Hands-on training for automation, embedded systems, software, electrical, and IoT teams.", tags: ["Workshops", "Labs", "Upskilling"] }
];

const industries = ["Manufacturing", "Water Utilities", "Energy", "Agriculture", "Smart Buildings", "Transport", "Education", "Public Infrastructure"];

const projects = [
  { name: "AGROMETER", area: "AgriTech metering", text: "Smart agricultural measurement platform for field data, productivity tracking, and better operational decisions." },
  { name: "Smart Water Meter", area: "Smart infrastructure", text: "Connected water usage monitoring with telemetry, alerts, and analytics for utility visibility." },
  { name: "RFID Attendance", area: "Identity systems", text: "RFID-based attendance automation for schools, organizations, and controlled facilities." },
  { name: "Visitor Management", area: "Enterprise software", text: "Secure visitor registration, approval, reporting, and audit-ready front-desk workflows." },
  { name: "Fish Feed Drying Machine", area: "Industrial equipment", text: "Applied mechanical, electrical, and control engineering for aquaculture production support." }
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

export function HomePage() {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.track.mutate({
      event: "page_view",
      path: "/",
      properties: { surface: "public_home" }
    });
  }, []);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-polystar-dark text-white">
        <Image
          src={industryImages[0].image}
          alt={industryImages[0].alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-polystar-dark/78" />
        <div className="absolute inset-0 -z-10 industrial-grid opacity-35" />
        <div className="container flex min-h-[82vh] items-end py-16">
          <motion.div className="max-w-5xl pb-4" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PolystarLogo priority tone="light" className="mb-8 max-w-[300px] sm:max-w-[460px]" />
            <Badge variant="secondary">POLYSTAR NANOTECH LTD · Kigali, Rwanda</Badge>
            <h1 className="mt-5 max-w-5xl text-[length:var(--font-size-display)] font-semibold leading-none">
              Engineering Smart Solutions for Industry, Infrastructure & Innovation
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Multidisciplinary engineering for automation, embedded systems, IIoT, electrical systems, smart infrastructure, software, consultancy, and training.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                onClick={() => trackEvent("request_consultation_click", { category: "cta", label: "hero" })}
              >
                <Link href="/request-consultation">
                  Request Consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 text-white hover:bg-white/15"
                onClick={() => trackEvent("view_projects_click", { category: "cta", label: "hero" })}
              >
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="border-l border-white/30 bg-white/10 px-4 py-3">
                  <div className="font-mono text-2xl font-semibold text-secondary">{value}</div>
                  <p className="mt-1 text-xs font-medium uppercase text-slate-200">{label}</p>
                </div>
              ))}
            </div>
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
            eyebrow="Industry Images"
            title="Visual coverage across engineering, industrial systems, software, data, cloud, and delivery teams."
            description="Professional imagery is used across the platform with responsive sizing, descriptive alt text, and lazy loading through Next.js image optimization."
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
              <Card key={service.title} className="group overflow-hidden transition-transform hover:-translate-y-1">
                <CardHeader>
                  <service.icon className="h-7 w-7 text-secondary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{service.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
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
            description="CMS records can replace these placeholders as team profiles are published."
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
