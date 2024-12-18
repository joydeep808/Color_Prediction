import { createContext, useContext, useEffect, useState } from "react";
import { ColorThemeTypes, DARK_THEME, LIGHT_THEME } from "../constants/Color";
import { useColorScheme } from "~/lib/useColorScheme";
import { setThemeContext } from "../constants/constants";

type Theme = "dark" | "light";

interface ThemeContextProps {
  currentThemeColor: ColorThemeTypes;
  setCurrentTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentThemeColor: LIGHT_THEME, // Default to light theme if no context is found
  setCurrentTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: any) => {
  const { colorScheme } = useColorScheme();  // Get system theme (dark or light)
  const [currentThemeColor, setCurrentTheme] = useState<ColorThemeTypes>(colorScheme === "dark" ? LIGHT_THEME : LIGHT_THEME);
  
  // Effect to update theme based on system preference (light/dark mode)
  useEffect(() => {
    if (colorScheme === "dark") {
      setCurrentTheme(DARK_THEME);
      setThemeContext(DARK_THEME);
    } else {
      setCurrentTheme(LIGHT_THEME);
      setThemeContext(DARK_THEME);

    }
  }, [colorScheme]);  // Only re-run when the system theme changes
  
  const setCurrentThemeForUser = (theme: Theme) => {
    // Update the theme based on user preference
    if (theme === "dark") {
      setCurrentTheme(DARK_THEME);
      setThemeContext(DARK_THEME);

    } else {
      setCurrentTheme(LIGHT_THEME);
      setThemeContext(DARK_THEME);

    }
  };

  const value = {
    currentThemeColor,
    setCurrentTheme: setCurrentThemeForUser,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
