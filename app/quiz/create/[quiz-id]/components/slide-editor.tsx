import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { FieldArrayWithId, UseFormReturn, Controller } from "react-hook-form";
import { formSchema } from "../page";
import z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface SlideEditorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  fields: FieldArrayWithId<z.infer<typeof formSchema>, "questions", "id">[];
  currentQIndex: number;
}

export default function SlideEditor({
  form,
  fields,
  currentQIndex,
}: SlideEditorProps) {
  const currentQuestion = fields[currentQIndex];
  const questionErrors = form.formState.errors.questions?.[currentQIndex];

  const addOption = () => {
    const currentOptions = form.getValues(`questions.${currentQIndex}.options`);
    if (currentOptions.length < 6) {
      form.setValue(`questions.${currentQIndex}.options`, [
        ...currentOptions,
        "",
      ]);
    }
  };

  const removeOption = (optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${currentQIndex}.options`);
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== optionIndex);
      form.setValue(`questions.${currentQIndex}.options`, newOptions);

      const currentCorrect = form.getValues(
        `questions.${currentQIndex}.correctAnsIndex`
      );
      if (currentCorrect === optionIndex) {
        form.setValue(`questions.${currentQIndex}.correctAnsIndex`, 0);
      } else if (currentCorrect > optionIndex) {
        form.setValue(
          `questions.${currentQIndex}.correctAnsIndex`,
          currentCorrect - 1
        );
      }
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-center text-muted-foreground">
        Select a slide to edit its properties
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold tracking-tight">Slide Content</h2>
        <p className="text-sm text-muted-foreground">Edit your question details</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
            <FieldGroup>
                <Controller
                control={form.control}
                name={`questions.${currentQIndex}.question`}
                render={({ field, fieldState }) => (
                    <Field>
                    <FieldLabel htmlFor={`question-${currentQIndex}`}>
                        Your Question
                    </FieldLabel>
                    <Textarea 
                        id={`question-${currentQIndex}`} 
                        {...field} 
                        placeholder="What would you like to ask?"
                        className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-between w-full">
                        <FieldDescription>
                            Max 200 characters
                        </FieldDescription>
                        <span className="text-xs text-muted-foreground">{field.value?.length || 0}/200</span>
                    </div>
                    <FieldError errors={[fieldState.error]} />
                    </Field>
                )}
                />

                <Controller
                control={form.control}
                name={`questions.${currentQIndex}.correctAnsIndex`}
                render={({ field: correctField, fieldState: correctFieldState }) => (
                    <Field>
                    <FieldLabel>Options</FieldLabel>
                    <div className="space-y-3">
                        {form
                        .watch(`questions.${currentQIndex}.options`)
                        ?.map((_, index) => (
                            <Controller
                            key={index}
                            control={form.control}
                            name={`questions.${currentQIndex}.options.${index}`}
                            render={({ field, fieldState }) => (
                                <div className="space-y-1">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Input 
                                                {...field} 
                                                placeholder={`Option ${index + 1}`}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            size="icon"
                                            onClick={() => correctField.onChange(index)}
                                            variant={
                                            correctField.value === index
                                                ? "default"
                                                : "outline"
                                            }
                                            className={cn(
                                                "shrink-0",
                                                correctField.value === index && "bg-emerald-600 hover:bg-emerald-700"
                                            )}
                                            title="Mark as correct answer"
                                        >
                                            <HugeiconsIcon icon={Tick01Icon} size={18} />
                                        </Button>
                                        
                                        {form.watch(`questions.${currentQIndex}.options`).length > 2 && (
                                            <Button
                                                type="button"
                                                size="icon"
                                                onClick={() => removeOption(index)}
                                                variant="ghost"
                                                className="shrink-0 text-muted-foreground hover:text-destructive"
                                            >
                                                <HugeiconsIcon icon={Delete02Icon} size={18} />
                                            </Button>
                                        )}
                                    </div>
                                    <FieldError errors={[fieldState.error]} />
                                </div>
                            )}
                            />
                        ))}
                    </div>
                    
                    <Button
                        type="button"
                        onClick={addOption}
                        variant="secondary"
                        className="w-full mt-2"
                        disabled={
                        form.watch(`questions.${currentQIndex}.options`).length >= 6
                        }
                    >
                        + Add Option
                    </Button>
                    <FieldError errors={[questionErrors?.options]} />
                    <FieldError errors={[correctFieldState.error]} />
                    </Field>
                )}
                />
            </FieldGroup>

            <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-foreground">Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                    control={form.control}
                    name={`questions.${currentQIndex}.timeLimit`}
                    render={({ field, fieldState }) => (
                        <Field>
                        <FieldLabel htmlFor={`timeLimit-${currentQIndex}`} className="text-xs">
                            Time (sec)
                        </FieldLabel>
                        <Input
                            id={`timeLimit-${currentQIndex}`}
                            type="number"
                            min={5}
                            max={300}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                    />

                    <Controller
                    control={form.control}
                    name={`questions.${currentQIndex}.points`}
                    render={({ field, fieldState }) => (
                        <Field>
                        <FieldLabel htmlFor={`points-${currentQIndex}`} className="text-xs">
                            Points
                        </FieldLabel>
                        <Input
                            id={`points-${currentQIndex}`}
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                        <FieldError errors={[fieldState.error]} />
                        </Field>
                    )}
                    />
                </div>
            </div>
        </div>
      </ScrollArea>
    </div>
  );
}
