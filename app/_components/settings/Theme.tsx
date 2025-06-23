"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function Theme() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  function handleThemeChange() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <div className="w-full flex items-center justify-between py-4 px-6 rounded-md border border-border">
      <div className="text-primary">
        <h2 className="font-semibold">Dark mode</h2>
        <p className="text-xs text-muted-foreground">
          Dark mode is currently {isDark ? "enabled" : "disabled"}. to change
          it, please disable it.
        </p>
      </div>

      <Switch
        className="cursor-pointer"
        checked={isDark}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
}
