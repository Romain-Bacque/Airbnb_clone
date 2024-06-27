// we have to name it "loading.tsx" because next.js will automatically render this component when the page is loading (it's the same with 404.tsx, error.tsx, and _app.tsx)
import Loader from "./Loader";

const Loading = () => {
  return <Loader />;
};

export default Loading;
