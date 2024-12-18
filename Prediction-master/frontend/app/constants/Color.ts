import { StyleSheet } from "react-native";

export type ColorThemeTypes = {
  base: {
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
    };
};
accent: {
    primary: {
        v1: string;
        v2: string;
        v3: string;
    };
    secondary: {
      v1: string,   // Burnt Orange
      v2:string    // Golden Orange
    }
  },
  interactive: {
    button: {
      background: string
      hover: string,
      text: string
      border: string
    }
  },

}

// experimental: {
//   purple: {
//     background: 'hsl(260, 15%, 10%)',
//     accent: 'hsl(270, 80%, 60%)'
//   },
//   teal: {
//     background: 'hsl(190, 15%, 10%)',
//     accent: 'hsl(180, 70%, 50%)'
//   },
//   deepGreen: {
//     background: 'hsl(220, 20%, 10%)',
//     accent: 'hsl(140, 70%, 50%)'
//   }
// }

export const CONST_COLOR = {
    base: {
      background: {
        primary: 'hsl(220, 15%, 10%)',
        secondary: 'hsl(220, 15%, 15%)',
        tertiary: 'hsl(220, 15%, 20%)'
      },
      text: {
        primary: 'hsl(0, 0%, 95%)',
        secondary: 'hsl(0, 0%, 70%)',
        muted: 'hsl(0, 0%, 50%)'
      }
    },
    accent: {
      primary: {
        v1: 'hsl(25, 90%, 55%)',   // Warm Orange
        v2: 'hsl(25, 90%, 50%)',   // Slightly Darker
        v3: 'hsl(25, 90%, 60%)'    // Lighter Variant
      },
      secondary: {
        v1: 'hsl(15, 80%, 45%)',   // Burnt Orange
        v2: 'hsl(40, 95%, 60%)'    // Golden Orange
      }
    },
    interactive: {
      button: {
        background: 'hsl(25, 90%, 55%)',
        hover: 'hsl(25, 90%, 60%)',
        text: 'hsl(0, 0%, 10%)',
        border: 'hsl(25, 90%, 50%)'
      }
    },
    experimental: {
      purple: {
        background: 'hsl(260, 15%, 10%)',
        accent: 'hsl(270, 80%, 60%)'
      },
      teal: {
        background: 'hsl(190, 15%, 10%)',
        accent: 'hsl(180, 70%, 50%)'
      },
      deepGreen: {
        background: 'hsl(220, 20%, 10%)',
        accent: 'hsl(140, 70%, 50%)'
      }
    
  }
}




export const LIGHT_THEME: ColorThemeTypes = {
  base: {
    background: {
      primary: 'hsl(210, 100%, 98%)',  // Light Sky Blue (softer and cooler)
      secondary: 'hsl(210, 50%, 96%)',  // Light Blue (more relaxed than pure white)
      tertiary: 'hsl(210, 20%, 92%)'   // Very Light Blue (subtle background for components)
    },
    text: {
      primary: 'hsl(210, 15%, 20%)',  // Dark Blue for text (less harsh than black)
      secondary: 'hsl(210, 10%, 40%)', // Medium Blue Gray for secondary text
      muted: 'hsl(210, 5%, 60%)'      // Light Gray for less important text
    }
  },
  accent: {
    primary: {
      v1: 'hsl(36, 100%, 60%)',  // Vibrant Yellow-Orange (fresh and energizing)
      v2: 'hsl(36, 90%, 55%)',   // Slightly Darker Warm Yellow-Orange
      v3: 'hsl(36, 100%, 70%)'   // Lighter version, pastel tone
    },
    secondary: {
      v1: 'hsl(18, 100%, 55%)',  // Soft Coral (warmer and inviting)
      v2: 'hsl(45, 100%, 60%)'   // Warm Golden Yellow (subtle contrast to primary accents)
    }
  },
  interactive: {
    button: {
      background: 'hsl(210, 100%, 40%)',  // Rich Blue (prominent for buttons)
      hover: 'hsl(210, 100%, 50%)',       // Slightly lighter Blue on hover
      text: 'black',           // White text for buttons for good contrast
      border: 'hsl(210, 100%, 35%)'       // Darker blue for button borders
    }
  },
}


export const DARK_THEME = {
  base: {
    background: {
      primary: 'hsl(220, 15%, 10%)',
      secondary: 'hsl(220, 15%, 15%)',
      tertiary: 'hsl(220, 15%, 20%)'
    },
    text: {
      primary: 'hsl(0, 0%, 95%)',
      secondary: 'hsl(0, 0%, 70%)',
      muted: 'hsl(0, 0%, 50%)'
    }
  },
  accent: {
    primary: {
      v1: 'hsl(25, 90%, 55%)',   // Warm Orange
      v2: 'hsl(25, 90%, 50%)',   // Slightly Darker
      v3: 'hsl(25, 90%, 60%)'    // Lighter Variant
    },
    secondary: {
      v1: 'hsl(15, 80%, 45%)',   // Burnt Orange
      v2: 'hsl(40, 95%, 60%)'    // Golden Orange
    }
  },
  interactive: {
    button: {
      background: 'hsl(25, 90%, 55%)',
      hover: 'hsl(25, 90%, 60%)',
      text: 'white',
      border: 'hsl(25, 90%, 50%)'
    }
  },
}



export const CURRENT_THEME_COLOR:ColorThemeTypes = {
  base: {
    background: {
      primary: 'hsl(220, 15%, 10%)',
      secondary: 'hsl(220, 15%, 15%)',
      tertiary: 'hsl(220, 15%, 20%)'
    },
    text: {
      primary: 'hsl(0, 0%, 95%)',
      secondary: 'hsl(0, 0%, 70%)',
      muted: 'hsl(0, 0%, 50%)'
    }
  },
  accent: {
    primary: {
      v1: 'hsl(25, 90%, 55%)',   // Warm Orange
      v2: 'hsl(25, 90%, 50%)',   // Slightly Darker
      v3: 'hsl(25, 90%, 60%)'    // Lighter Variant
    },
    secondary: {
      v1: 'hsl(15, 80%, 45%)',   // Burnt Orange
      v2: 'hsl(40, 95%, 60%)'    // Golden Orange
    }
  },
  interactive: {
    button: {
      background: 'hsl(25, 90%, 55%)',
      hover: 'hsl(25, 90%, 60%)',
      text: 'white',
      border: 'hsl(25, 90%, 50%)'
    }
  },
  // experimental: {
  //   purple: {
  //     background: "hsl(260, 15%, 10%)",
  //     accent: "hsl(270, 80%, 60%)"
  //   },
  //   teal: {
  //     background: "hsl(190, 15%, 10%)",
  //     accent: "hsl(180, 70%, 50%)"
  //   },
  //   deepGreen: {
  //     background: "hsl(220, 20%, 10%)",
  //     accent: "hsl(140, 70%, 50%)"
  //   }
  // }
}




// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   heading:{
//     color:CURRENT_THEME_COLOR.interactive.button.background
//   },

//   text:{
//     color:CURRENT_THEME_COLOR.base.text.primary,
//     fontSize:14,
//   }
// });
