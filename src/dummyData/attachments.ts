import type { AttachmentFile } from "../types/attachment";

export const MOCK_ATTACHMENTS: AttachmentFile[] = [
  {
    id: 1,
    name: "Sample.pdf",
    type: "application/pdf",
    size: 2 * 1024 * 1024, // 2MB
    date: new Date("2021-01-12"),
  },
  {
    id: 2,
    name: "Sample.pdf",
    type: "application/pdf",
    size: 2 * 1024 * 1024,
    date: new Date("2021-01-12"),
  },
  {
    id: 3,
    name: "Sample.pdf",
    type: "application/pdf",
    size: 2 * 1024 * 1024,
    date: new Date("2021-01-12"),
  },
  {
    id: 4,
    name: "Sample.pdf",
    type: "application/pdf",
    size: 2 * 1024 * 1024,
    date: new Date("2021-01-12"),
    path: "/SUBPATH",
  },
];
