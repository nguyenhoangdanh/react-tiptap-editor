# React TipTap Editor Library - PRD

A comprehensive React Editor Library built on TipTap with complete extensibility, drag-and-drop image support, and customizable architecture for modern web applications.

**Experience Qualities**:
1. **Extensible** - Every component, extension, and behavior can be customized or overridden without touching library code
2. **Performant** - Optimized for fast editing experiences with smooth drag-and-drop and real-time formatting
3. **Developer-Friendly** - Clear TypeScript APIs, comprehensive documentation, and intuitive configuration patterns

**Complexity Level**: Complex Application (advanced functionality, accounts)
Advanced rich text editing functionality with drag-and-drop, extensible architecture, and comprehensive plugin system requiring sophisticated state management and component composition.

## Essential Features

### Core Editor Component
- **Functionality**: Main editor wrapper that accepts full TipTap configuration and renders the editing interface
- **Purpose**: Provides the primary interface for rich text editing with full customization control
- **Trigger**: Component mount with optional initial content
- **Progression**: Initialize → Configure Extensions → Render Interface → Handle User Input → Emit Changes
- **Success criteria**: Editor renders correctly, accepts custom configurations, and maintains state properly

### Extensible Toolbar System
- **Functionality**: Customizable toolbar with drag-and-drop arrangement and custom button support
- **Purpose**: Provides quick access to formatting commands while allowing complete UI customization
- **Trigger**: Editor focus or manual display toggle
- **Progression**: Mount → Load Extensions → Render Buttons → Handle Commands → Update Editor State
- **Success criteria**: Toolbar buttons work correctly, custom components integrate seamlessly, and commands execute properly

### Drag-and-Drop Image Management
- **Functionality**: Full image support with resizing, drag positioning, and text wrapping
- **Purpose**: Modern image editing experience comparable to Google Docs or Notion
- **Trigger**: Image upload, paste, or drag from external source
- **Progression**: Image Insert → Display with Handles → Drag to Position → Resize as Needed → Update Text Flow
- **Success criteria**: Images can be positioned anywhere, resize maintains aspect ratio, and text wraps naturally

### Bubble Menu System
- **Functionality**: Context-sensitive formatting menu that appears near selected text
- **Purpose**: Provides quick formatting access without cluttering the main interface
- **Trigger**: Text selection or element focus
- **Progression**: Selection Made → Calculate Position → Show Menu → Apply Formatting → Hide Menu
- **Success criteria**: Menu appears in correct position, doesn't interfere with text, and commands work properly

### Hook-Based Architecture
- **Functionality**: Custom React hooks for editor state, commands, and selection management
- **Purpose**: Allows developers to build custom interfaces while maintaining editor functionality
- **Trigger**: Hook usage in custom components
- **Progression**: Hook Call → Access Editor Instance → Subscribe to Changes → Return Current State
- **Success criteria**: Hooks provide accurate state, update reactively, and enable custom component creation

### Extension Override System
- **Functionality**: Complete override capability for any TipTap extension or plugin
- **Purpose**: Enables customization of editor behavior without forking the library
- **Trigger**: Extension configuration during editor initialization
- **Progression**: Configure → Override Default → Initialize Editor → Validate Behavior
- **Success criteria**: Custom extensions work properly, don't break existing functionality, and integrate seamlessly

## Edge Case Handling

- **Network Connectivity Loss**: Cache image uploads locally and retry when connection restored
- **Large Image Files**: Automatic compression and loading states with progress indicators
- **Keyboard Navigation**: Full accessibility support for screen readers and keyboard-only users
- **Mobile Touch Interfaces**: Responsive touch targets and gesture-based editing controls
- **Content Validation**: Sanitization and validation of pasted content from external sources
- **Undo/Redo Conflicts**: Proper state management during drag operations and complex edits
- **Extension Conflicts**: Graceful handling of conflicting extensions with clear error messages

## Design Direction

The interface should feel modern and professional like Notion or Linear, with clean lines and subtle shadows that emphasize content over chrome. Minimal interface that gets out of the user's way while providing powerful functionality when needed.

## Color Selection

Analogous color scheme using cool grays and blues to create a calming, focused editing environment.

- **Primary Color**: Deep Blue (oklch(0.5 0.2 240)) - Communicates trust and professionalism for key actions
- **Secondary Colors**: Light Gray (oklch(0.95 0.02 240)) for backgrounds and Charcoal (oklch(0.3 0.02 240)) for text
- **Accent Color**: Bright Blue (oklch(0.6 0.25 240)) for highlights, selection, and active states
- **Foreground/Background Pairings**:
  - Background (White oklch(1 0 0)): Charcoal text (oklch(0.3 0.02 240)) - Ratio 15.8:1 ✓
  - Card (Light Gray oklch(0.95 0.02 240)): Charcoal text (oklch(0.3 0.02 240)) - Ratio 14.2:1 ✓
  - Primary (Deep Blue oklch(0.5 0.2 240)): White text (oklch(1 0 0)) - Ratio 7.1:1 ✓
  - Accent (Bright Blue oklch(0.6 0.25 240)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓

## Font Selection

Inter font family for its exceptional readability and modern aesthetic in editing interfaces, with clear distinction between regular text and code elements.

- **Typographic Hierarchy**:
  - H1 (Main Headings): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - H3 (Subsections): Inter Medium/20px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Code: JetBrains Mono/14px/normal spacing
  - UI Elements: Inter Medium/14px/tight spacing

## Animations

Subtle and purposeful animations that enhance the editing experience without being distracting, focusing on smooth state transitions and drag feedback.

- **Purposeful Meaning**: Motion communicates relationships between elements and provides feedback for user actions
- **Hierarchy of Movement**: Editor content changes are immediate, UI elements fade smoothly, drag operations provide continuous feedback

## Component Selection

- **Components**: Extensive use of Radix UI primitives (Toolbar, DropdownMenu, Popover, Separator) with minimal shadcn styling overrides to maintain flexibility
- **Customizations**: Custom drag handles, resize controls, and floating menu components built specifically for editor needs
- **States**: All interactive elements support hover, active, focused, and disabled states with smooth transitions
- **Icon Selection**: Phosphor Icons for consistent weight and style across all toolbar and menu elements
- **Spacing**: Consistent 4px grid system using Tailwind's spacing scale for predictable layouts
- **Mobile**: Responsive design with touch-friendly targets, collapsible toolbars, and optimized gesture handling for tablet editing