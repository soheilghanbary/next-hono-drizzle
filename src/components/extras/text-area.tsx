import {
  forwardRef,
  type ForwardedRef,
  type TextareaHTMLAttributes,
} from "react"
import { Label } from "@ui/label"
import { Textarea } from "@ui/textarea"
import { cn } from "@lib/utils"

type TextFieldAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
}

export const TextFieldArea = forwardRef(function MyInput(
  { label, className, ...rest }: TextFieldAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label>{label}</Label>
      <Textarea ref={ref} {...rest} />
    </div>
  )
})
