import { cn } from "@lib/utils"
import { Input } from "@ui/input"
import { Label } from "@ui/label"
import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react"

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const TextField = forwardRef(function MyInput(
  { label, className, ...rest }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={cn("grid gap-2 [&>label]:text-sm", className)}>
      <Label>{label}</Label>
      <Input type="text" autoComplete="off" ref={ref} {...rest} />
    </div>
  )
})
