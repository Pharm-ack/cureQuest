"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { DonationSchema } from "@/schema";
import { createDonation } from "@/actions/action";
import { DonateBtn } from "@/components/custom-btn";

export default function Component() {
  const [lastResult, action] = useFormState(createDonation, undefined);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: DonationSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/red-heart-to.jpg')] bg-cover bg-center bg-opacity-5">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
                Help Fund Life-Changing Research
              </h1>
              <p className="text-xl text-primary-foreground md:text-2xl">
                Your donation can make a real difference in the fight against
                devastating diseases.
              </p>
              <Button asChild variant="default" size="lg">
                <Link href="#donate">Donate Now</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Mission
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  We are dedicated to funding groundbreaking research that leads
                  to new treatments and cures for devastating diseases. Your
                  support helps us make a real impact in the lives of those
                  affected.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Our Impact
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Thanks to the generosity of our donors, we&apos;ve been able
                  to fund critical research that has led to advancements in
                  treatment and improved outcomes for patients. Your donation
                  can help us continue this important work.
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  How Your Donation Helps
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Your donation will be used to support our research grants,
                  clinical trials, and educational programs. We are committed to
                  using your contribution responsibly and transparently to make
                  the greatest impact possible.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="donate"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Donate to Support Our Mission
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Your donation can make a real difference in the lives of those
                  affected by devastating diseases.
                </p>
              </div>
              <Card className="p-6 md:p-8">
                <form
                  id={form.id}
                  onSubmit={form.onSubmit}
                  action={action}
                  className="grid gap-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                        key={fields.name.key}
                        name={fields.name.name}
                        defaultValue={fields.name.initialValue}
                      />
                      <p className="text-red-500">{fields.name.errors}</p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        key={fields.email.key}
                        name={fields.email.name}
                        defaultValue={fields.email.initialValue}
                      />
                      <p className="text-red-500">{fields.email.errors}</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Donation Amount</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-medium">$</span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        className="text-xl font-medium"
                        key={fields.amount.key}
                        name={fields.amount.name}
                        defaultValue={fields.amount.initialValue}
                      />
                      <p className="text-red-500">{fields.amount.errors}</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      placeholder="Let us know if you have any additional comments or instructions"
                    />
                  </div>
                  <DonateBtn />
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
