import { createRoot } from 'react-dom/client';
import WebApp from './App';

test("renders without crashing", () => {
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<WebApp />);
  root.unmount();
});