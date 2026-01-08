export type Reply = {
  id: number;
  author: string;
  content: string;
  createdAt: number;
  replies: Reply[];
};

export type DiscussionComment = {
  id: number;
  author: string;
  content: string;
  createdAt: number;
  replies: Reply[];
};

export const INITIAL_DISCUSSION: DiscussionComment[] = [
  {
    id: 1,
    author: "User 01",
    content: "Hello, how is it going?",
    createdAt: new Date("2025-12-21T17:00:00").getTime(),
    replies: [
      {
        id: 11,
        author: "User 02",
        content: "Good, I'm fine.",
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000,
        replies: [],
      },
      {
        id: 12,
        author: "User 03",
        content:
          "I'm not good. I'm having a headaches... Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000,
        replies: [],
      },
    ],
  },
];

