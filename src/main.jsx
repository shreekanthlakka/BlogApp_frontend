import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import { PostContextProvider } from "./context/postContext.jsx";
import { CommentContextProvider } from "./context/commentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
        <PostContextProvider>
            <CommentContextProvider>
                <App />
            </CommentContextProvider>
        </PostContextProvider>
    </AuthContextProvider>
);
