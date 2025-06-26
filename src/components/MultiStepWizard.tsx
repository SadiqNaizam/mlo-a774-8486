import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Define the validation schema for the entire form
const rfpFormSchema = z.object({
  rfpTitle: z.string().min(2, { message: "RFP Title must be at least 2 characters." }),
  clientName: z.string().min(2, { message: "Client Name must be at least 2 characters." }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Please enter a valid date." }),
  estimatedValue: z.coerce.number().min(0, { message: "Estimated value must be a positive number." }),
  summary: z.string().max(500, { message: "Summary cannot exceed 500 characters." }).optional(),
});

type RfpFormData = z.infer<typeof rfpFormSchema>;

// Define the steps and the fields they contain
const steps = [
  {
    id: 'step1',
    name: 'Basic Information',
    fields: ['rfpTitle', 'clientName'],
  },
  {
    id: 'step2',
    name: 'Dates & Deadlines',
    fields: ['dueDate'],
  },
  {
    id: 'step3',
    name: 'Value & Summary',
    fields: ['estimatedValue', 'summary'],
  },
];

const MultiStepWizard: React.FC = () => {
  console.log('MultiStepWizard loaded');
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<RfpFormData>({
    resolver: zodResolver(rfpFormSchema),
    mode: 'onChange',
    defaultValues: {
      rfpTitle: '',
      clientName: '',
      dueDate: '',
      estimatedValue: 0,
      summary: '',
    },
  });

  const { trigger, handleSubmit } = form;

  const handleNext = async () => {
    const fields = steps[currentStep].fields as (keyof RfpFormData)[];
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const processForm = (data: RfpFormData) => {
    console.log('RFP Data Submitted:', data);
    toast.success('RFP Created Successfully!', {
      description: `The RFP "${data.rfpTitle}" for ${data.clientName} has been saved.`,
    });
    // Here you would typically call an API to save the data
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New RFP</CardTitle>
        <CardDescription>Step {currentStep + 1} of {steps.length} - {steps[currentStep].name}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(processForm)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="rfpTitle" render={({ field }) => (
                      <FormItem>
                        <FormLabel>RFP Title</FormLabel>
                        <FormControl><Input placeholder="e.g., Q3 Enterprise Software Upgrade" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clientName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Globex Corporation" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}

                {currentStep === 1 && (
                  <FormField control={form.control} name="dueDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="estimatedValue" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Value ($)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 50000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="summary" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl><Textarea placeholder="Provide a brief summary of the RFP requirements..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button type="button" onClick={handleNext}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit(processForm)}>
            Submit RFP
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiStepWizard;