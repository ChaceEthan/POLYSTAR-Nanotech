"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { RequestFormType } from "@/types";
import { usePublicRequests } from "@/hooks/use-platform-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10)
});

export function RequestForm({ type }: { type: RequestFormType }) {
  const requests = usePublicRequests();
  const mutation = requests[type];
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    }
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    try {
      await mutation.mutateAsync(values);
      form.reset();
      setSuccessMessage("Request submitted successfully");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit this request. Please try again.");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold">Submit Request</h2>
        <p className="mt-1 text-sm text-muted-foreground">A POLYSTAR technical representative will respond with next steps.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...form.register("company")} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" {...form.register("subject")} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...form.register("message")} />
      </div>
      {successMessage && <p className="text-sm font-medium text-accent">{successMessage}</p>}
      {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}
      <Button type="submit" disabled={form.formState.isSubmitting || mutation.isPending}>
        <Send className="h-4 w-4" />
        {form.formState.isSubmitting || mutation.isPending ? "Submitting..." : "Send Request"}
      </Button>
    </form>
  );
}
