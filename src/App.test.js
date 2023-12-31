import App from "./App";
import {screen, render} from "@testing-library/react";
import store from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const rend = component => render(
    <BrowserRouter>
    <Provider store={store}>
        {component}
    </Provider>
    </BrowserRouter>
)

describe("App Component",() => {
    test('renders posts if request succeeds', async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => {return{id: 'p1', title: 'First post'}}
        });
        rend(<App />);

    //    const list = await screen.findAllByRole('listitem');
    //    expect(list).not.toHaveLength(0);
    });
});