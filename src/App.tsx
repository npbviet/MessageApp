import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import MessagesPage from "./pages/MessagesPage";
import DiscussionPage from "./pages/DiscussionPage";
import AttachmentsPage from "./pages/AttachmentsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MessagesPage />} />
          <Route path="discussion" element={<DiscussionPage />} />
          <Route path="attachments" element={<AttachmentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
