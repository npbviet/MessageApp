# MessageApp

A React-based messaging application featuring three main exercises: Message Interface, Discussion Threads, and File Attachments Management.

## Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library

**Build Time:** 9 hours


### I. Message Interface

A simple messaging interface with a list of messages and a compose box.

**Route:** `/` (Home page)

**Components:**
- `MessagesPage` - Main page component
- `MessageList` - Displays list of messages
- `MessageDetail` - Shows selected message details
- `Composer` - Message composition box
- `Sidebar` - Navigation sidebar

---

### II. Discussion Threads

A discussion thread with comments and one level of replies. Replies should visually resemble a chat interface.

**Route:** `/discussion`

**Components:**
- `DiscussionPage` - Main page component
- `CommentCard` - Individual comment display
- `ReplyItem` - Reply item with nested replies support
- `ReplyEditor` - Inline reply input component

---

### III. Attachments Management

An attachments section that allows displaying and uploading files.

**Route:** `/attachments`

**Components:**
- `AttachmentsPage` - Main page component
- `AttachmentsTable` - Table displaying file list
- `AttachmentRow` - Individual file row
- `UploadBox` - Drag-and-drop upload area with validation
- `ActionsMenu` - Dropdown menu for bulk actions
- `FileIcon` - File type icon component

**Features:**
- File type detection and formatting (PDF, DOCX, XLSX, images, etc.)
- File size formatting (B, KB, MB, GB)
- Client-side validation for file size (max 10MB) and file type
- Duplicate file prevention
- Grouping by subpath/folder
- Selection with checkboxes (single and select all)
- Actions: Activity History, Download All, Move, Copy, Delete

## Project Structure

```
src/
├── components/
│   ├── attachments/      # Attachment management components
│   ├── discussion/       # Discussion thread components
│   └── messages/         # Message interface components
├── dummyData/            # Mock data for development
├── layout/               # Layout components (Header, Layout)
├── pages/                # Page components
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── fileSize.ts      # File size formatting
│   ├── fileType.ts      # File type formatting
│   └── time.ts          # Time formatting utilities
├── App.tsx              # Main app component with routing
└── main.tsx             # Entry point
```


## Key Architectural Decisions and Trade-offs

### Component Architecture
- **Decision:** Modular component structure with separation of concerns (pages, components, utils, types)
- **Trade-off:** More files to manage, but better maintainability and reusability

### State Management
- **Decision:** Local component state with React hooks (`useState`, `useCallback`) instead of global state management
- **Trade-off:** Simpler setup, but state duplication across components

### Styling Approach
- **Decision:** Tailwind CSS utility classes instead of CSS modules or styled-components
- **Trade-off:** More verbose JSX, but faster development and consistent design system

### File Upload Handling
- **Decision:** Client-side only file handling with duplicate prevention using name-size keys
- **Trade-off:** No persistence, but works without backend infrastructure


## Notes

- Uses mock data from `src/dummyData/`
- Client-side file upload only (no backend)
- All file actions are mocked
- Home UI slightly diverges from Figma but follows the Messaging Outline structure
- Consider using Tailwind CSS together with `module.css` for component-level styling


