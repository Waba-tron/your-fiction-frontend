import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import { StoryProvider } from "../context/StoryContext";
import { ReviewProvider } from "../context/ReviewContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StoryProvider>
        <ReviewProvider>
          <Component {...pageProps} />
        </ReviewProvider>
      </StoryProvider>
    </AuthProvider>
  );
}

export default MyApp;
