import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import { StoryProvider } from "../context/StoryContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <StoryProvider>
        <Component {...pageProps} />
      </StoryProvider>
    </AuthProvider>
  );
}

export default MyApp;
