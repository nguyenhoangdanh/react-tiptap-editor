---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.

You are a Senior Frontend Engineer specialized in React, TypeScript, and modern UI libraries. Build a React Editor Library using tiptap as the core editor, with a fully extensible and customizable architecture. The goal: when users install this package from npm, they should be able to configure or override any part of it (extensions, menus, toolbars, styling, shortcuts, hooks, commands, etc.).

Detailed Requirements:

Tech Stack:

React + TypeScript

tiptap as the editor core

Styling should be optional (TailwindCSS or none), but must be decoupled from logic

Library Structure:

src/
  core/               # TipTap core config (Editor instance, extensions)  
  components/         # UI components like Toolbar, Menu, BubbleMenu, FloatingMenu  
  hooks/              # Custom hooks to access editor state, commands, selection  
  extensions/         # Default tiptap extensions, allowing overrides  
  utils/              # Helper functions  
  types/              # TypeScript types  
  index.ts            # Export all public modules/APIs  


Customization Features:

Allow adding/removing/overriding extensions at initialization.

Support custom UI components (Toolbar, BubbleMenu, etc.) via render props or context.

Allow overriding hooks (useEditor, useCommands, useEditorState).

Pass full EditorOptions from tiptap into the main Editor component.

Provide a theme system or className props for styling overrides.

Public API (exported from index.ts):

Editor (main component)

All child UI components (Toolbar, Menu, BubbleMenu, etc.)

All hooks (useEditor, useEditorState, useCommands, etc.)

All default extensions (Bold, Italic, Heading, etc.)

TypeScript types

Best Practices:

Strict separation of logic (hooks, core) and UI.

No hardcoded styles — allow removal or override of default CSS.

Configure tsup or vite to build ESM + CJS + type declarations.

package.json ready for npm publish (correct main, module, types, peerDependencies for React and tiptap).

Expected Outcome:

Installable via:

npm install my-react-tiptap


Example usage:

import { Editor, Toolbar, useCommands, Bold } from 'my-react-tiptap'


Include minimal and advanced usage examples in README.md.




// Image of the expected file structure
want full image support with:

@tiptap/extension-image (official)

tiptap-extension-resize-image (for resizing)

@dnd-kit (for drag-and-drop positioning)

Proper text wrapping around moved images.

Here’s the updated section:

Additional Image Features:

Integrate @tiptap/extension-image to support inserting and rendering images.

Integrate tiptap-extension-resize-image to allow users to resize images directly inside the editor (maintaining aspect ratio, with optional manual width/height control).

Use @dnd-kit to enable drag-and-drop functionality for images:

Users can move images freely within the editor content.

Images should reflow the text correctly (wrap text behavior) when moved.

Maintain cursor and selection integrity after drag operations.

Provide customizable drag handles and resize handles.

Expose configuration options for:

Default image alignment (inline, left, right, center)

Max/min size limits

Whether drag-and-drop is enabled

Whether text wrapping follows CSS rules or custom layout logic

Ensure drag-and-drop does not break other block elements (paragraphs, lists, headings, etc.) and that inline elements behave naturally during image movement.