import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";
import { StoryProvider } from "../context/StoryContext";
import { ReviewProvider } from "../context/ReviewContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { API_URL } from "../config";

const client = new ApolloClient({
  uri: `${API_URL}`,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StoryProvider>
          <ReviewProvider>
            <Component {...pageProps} />
          </ReviewProvider>
        </StoryProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
