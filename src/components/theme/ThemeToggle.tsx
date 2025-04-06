
import { Moon, Sun } from "lucide-react";
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
  const { theme, setTheme } = useTheme();

  const handleLightClick = useCallback(() => setTheme("light"), [setTheme]);
  const handleDarkClick = useCallback(() => setTheme("dark"), [setTheme]);
  const handleSystemClick = useCallback(() => setTheme("system"), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLightClick}>
          Light
        </DropdownMenuItem>
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
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-8 h-8"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});

ThemeToggleMinimal.displayName = 'ThemeToggleMinimal';
