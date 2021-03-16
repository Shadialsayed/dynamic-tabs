import './App.css';
import ScrollableTabsButtonAuto from "./components/tabs";
import { Provider } from 'react-redux'
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <ScrollableTabsButtonAuto />
        </div>
    </Provider>
  );
}

export default App;
