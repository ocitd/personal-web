"use client";

import { sendEmail } from "@/server/sendEmail";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    service: "",
    timeline: "",
    message: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | string>(null);

  const inputClass =
    "w-full mt-1 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-200 placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500";

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendEmail(formData);
      if (res.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          number: "",
          service: "",
          timeline: "",
          message: "",
          company: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-neutral-500">
            Have an idea or project? Send me a message using the form below.
          </p>
        </div>

        <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
          <div>
            <h2 className="text-xl font-semibold">
              Let's get you to the right place
            </h2>
            <p className="mt-4 text-sm">
              Reach out to our sales team! We’re eager to learn more about how
              you plan to use our application.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="name">Number</Label>
              <Input
                type="number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div>
              <Label htmlFor="country">Country/Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country/Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">DR Congo</SelectItem>
                  <SelectItem value="2">United States</SelectItem>
                  <SelectItem value="3">France</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <Label htmlFor="website">Company</Label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              {/* <span className="text-muted-foreground inline-block text-sm">
                Must start with 'https'
              </span> */}
            </div>

            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                type="text"
                id="timeline"
                name="timeline"
                placeholder="e.g. 3 months, 2 weeks"
                value={formData.timeline}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="services">Services</Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, service: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Job Function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="API Integration">
                    API Integration
                  </SelectItem>
                  <SelectItem value="Hosting">
                    Hosting & Server Setup
                  </SelectItem>
                  <SelectItem value="More">More</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={3}
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
            {status === "success" && (
              <p className="mt-3 text-green-500 text-sm">
                ✅ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-red-500 text-sm">
                ❌ Failed to send message. Try again.
              </p>
            )}
          </motion.form>
        </Card>
      </div>
    </section>
  );
}
