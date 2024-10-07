import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalStateContext } from '../../context/GlobalStateContext';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the GlobalStateContext
const mockState = {
  isAuthenticated: false,
  // ... other state properties if needed
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

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders Login component', () => {
    renderWithContext(<Login />);
    expect(screen.getByText(/Sign in to Dribbble/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username or Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/or sign in with email/i)).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    renderWithContext(<Login />);
    
    const usernameInput = screen.getByLabelText(/Username or Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls dispatch on form submission with valid credentials', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ username: 'testuser', email: 'test@example.com', password: '$2a$10$...' }]),
      })
    );

    renderWithContext(<Login />);

    fireEvent.change(screen.getByLabelText(/Username or Email/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
  });

});
