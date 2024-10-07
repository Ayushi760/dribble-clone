import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GlobalStateContext } from "../../context/GlobalStateContext";
import Register from "./Register";
import { BrowserRouter as Router } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../../api/api';

// Mock the GlobalStateContext
const mockState = {
    isAuthenticated: false,
    // ... other state properties if needed
};

jest.mock("../../api/api", () => ({
    registerUser: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
    success: jest.fn(), 
    error: jest.fn(),
}));

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

describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Register component', () => {
        renderWithContext(<Register/>);
        expect(screen.getByText(/Sign up to Dribbble/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
        expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
    });

    test('updates input values on change', () => {
        renderWithContext(<Register />);
        
        const nameInput = screen.getByLabelText(/Name/);
        const usernameInput = screen.getByLabelText(/Username/i);
        const emailInput = screen.getByLabelText(/Email/i)
        const passwordInput = screen.getByLabelText(/Password/i);
        
        fireEvent.change(nameInput, { target: { value: 'test' } });
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'testuser@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        expect(nameInput.value).toBe('test');
        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('testuser@gmail.com');
        expect(passwordInput.value).toBe('password123');
      });

      test('successfully registers a user', async () => {
        registerUser.mockResolvedValueOnce({
            fullname: 'test',
            username: 'testuser',
            email: 'test@gmail.com',
        });

        renderWithContext(<Register />);
    
        fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'test' } });
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    
        fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_LOADING",
                payload: true,
            });
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "REGISTER",
                payload: { fullname: 'test', username: 'testuser', email: 'test@gmail.com' }
            });
            expect(toast.success).toHaveBeenCalledWith("Registration Successfully!");
        });
      });

})