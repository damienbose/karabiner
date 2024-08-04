import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "right command -> hyper_key",
        from: {
          key_code: "right_command",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        type: "basic"
      },
    ]
  },
  {
    description: "Make caps lock escape and control",
    manipulators: [
      {
        description: "Caps Lock -> Control",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control"
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      // {
      //   type: "basic",
      //   description: "Disable CMD + Tab to force Hyper Key usage",
      //   from: {
      //     key_code: "tab",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "tab",
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      u: open("https://youtube.com"), // "U"tube
      j: open("https://github.com/damienbose"), // "J"ira
      p: open("https://tweek.so"), // "P"lanner
    },
    // o = "Open" applications
    o: {
      g: app("Microsoft Outlook"), // "G"mail
      w: app("Microsoft Word"), // "W"ord
      c: app("Google Chrome"), // "C"hrome
      v: app("Visual Studio Code"), // "V"isual Studio Code
      t: app("iTerm"), // "T"erminal
      z: app("zoom.us"), // "Z"oom
      m: app("Obsidian"), // "M"arkdown
      f: app("Finder"), // "F"inder
      r: app("WhatsApp"), // "R"eact
      s: app("Spotify"), // "S"potify
    },

    // Find for arrows 
    // so that hjkl work like they do in vim
    f: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
    },
  },
  ),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
