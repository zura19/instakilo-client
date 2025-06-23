import { Button } from "@/components/ui/button";

export type ButtonVariants =
  | "default"
  | "secondary"
  | "ghost"
  | "link"
  | "destructive"
  | "outline";

export type ButtonSizes = "default" | "sm" | "lg" | "icon";

export default function FormButtonComp({
  text,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  disabled = false,
  type = "button",
}: {
  text: string;
  className?: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled}
      type={type}
      className={"w-full  " + className}
    >
      {isLoading ? "Loading..." : `${text}`}
    </Button>
  );
}
