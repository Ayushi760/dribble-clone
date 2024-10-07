import { GlobalStateContext } from "../../context/GlobalStateContext";
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from "./Dashboard";
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard Component', () => {

    const mockState = {
        categories: [
            {
                name: "Category 1",
                designs: [{ id: 1, title: "Design 1" }, { id: 2, title: "Design 2" }],
            },
            {
                name: "Category 2",
                designs: [{ id: 3, title: "Design 3" }],
            },
        ],
    };

    const mockDispatch = jest.fn();

    const renderWithContext = (children) => {
        return render(
            <GlobalStateContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
                <Router>
                    {children}
                </Router>
            </GlobalStateContext.Provider>
        );
    };

    test('renders Dashboard component', () => {
        renderWithContext(<Dashboard />);
        expect(screen.getByText(/Discover/i)).toBeInTheDocument();
        expect(screen.getByText(/Category 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Category 2/i)).toBeInTheDocument();
        expect(screen.getByText(/No designs found./i)).toBeInTheDocument();
    });
})