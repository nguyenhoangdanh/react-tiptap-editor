import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestIndex from "./pages/TestIndex";
import SimpleTest from "./pages/SimpleTest";
import Index from "./pages/Index";
import FeatureTest from "./pages/FeatureTest";
import DebugEditor from "./pages/DebugEditor";
import EditorTest from "./pages/EditorTest";
import TestHistoryFix from "./pages/TestHistoryFix";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TestIndex />} />
                    <Route path="/simple" element={<SimpleTest />} />
                    <Route path="/full" element={<Index />} />
                    <Route path="/feature-test" element={<FeatureTest />} />
                    <Route path="/debug" element={<DebugEditor />} />
                    <Route path="/test" element={<EditorTest />} />
                    <Route path="/history-fix" element={<TestHistoryFix />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
