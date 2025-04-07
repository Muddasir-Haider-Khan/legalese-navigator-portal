
import { Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { memo, useCallback } from "react";

export const ThemeToggle = memo(() => {
  const { setTheme } = useTheme();

  const handleDarkClick = useCallback(() => setTheme("dark"), [setTheme]);
  const handleSystemClick = useCallback(() => setTheme("system"), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
          <span className="sr-only">Theme settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDarkClick}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystemClick}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export const ThemeToggleMinimal = memo(() => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-8 h-8"
      aria-label="Dark theme enabled"
    >
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark theme</span>
    </Button>
  );
});

ThemeToggleMinimal.displayName = 'ThemeToggleMinimal';
