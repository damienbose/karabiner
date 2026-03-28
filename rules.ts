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
    description: "Make non_us_backslash caps lock",
    manipulators: [
      {
        description: "non_us_backslash -> Caps Lock",
        from: {
          key_code: "non_us_backslash",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "caps_lock"
          },
        ],
        type: "basic",
      },
    ],
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
    ],
  },
  ...createHyperSubLayers({
    // "Use arrow keys"
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

    // o = "Open" applications
    o: {
      g: app("Microsoft Outlook"),
      w: app("Microsoft Word"),
      c: app("Google Chrome"),
      v: app("Visual Studio Code"),
      t: app("iTerm"),
      z: app("zoom.us"),
      e: app("Obsidian"),
      f: app("Finder"),
      r: app("WhatsApp"),
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
