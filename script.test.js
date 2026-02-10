describe('handleUsernameSubmit', () => {
    let mockEvent;
    let mockInput;
    let mockForm;
    let mockSubmitBtn;
    
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        
        // Clear all timers
        jest.clearAllTimers();
        jest.useFakeTimers();
        
        // Mock DOM elements
        mockInput = {
            value: '',
            classList: {
                remove: jest.fn(),
                add: jest.fn()
            }
        };
        
        mockSubmitBtn = {
            innerHTML: 'Save Username',
            disabled: false
        };
        
        mockForm = {
            querySelector: jest.fn().mockReturnValue(mockSubmitBtn)
        };
        
        // Mock document.getElementById
        global.document.getElementById = jest.fn((id) => {
            if (id === 'usernameInput') return mockInput;
            if (id === 'usernameForm') return mockForm;
            if (id === 'usernameError') return { style: { display: 'none' }, textContent: '' };
            if (id === 'usernameSuccess') return { style: { display: 'none' }, textContent: '' };
            return null;
        });
        
        // Mock event object
        mockEvent = {
            preventDefault: jest.fn()
        };
    });
    
    afterEach(() => {
        jest.useRealTimers();
    });
    
    test('should call preventDefault on form submit', () => {
        mockInput.value = 'ValidUser123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
    
    test('should save valid username to localStorage', () => {
        mockInput.value = 'ValidUser123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBe('ValidUser123');
    });
    
    test('should not save invalid username (too short)', () => {
        mockInput.value = 'Short1';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBeNull();
    });
    
    test('should not save invalid username (no uppercase)', () => {
        mockInput.value = 'nouppercase123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBeNull();
    });
    
    test('should trim whitespace from username before validation', () => {
        mockInput.value = '  ValidUser123  ';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBe('ValidUser123');
    });
    
    test('should update button text to "✅ Saved!" when username is valid', () => {
        mockInput.value = 'ValidUser123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockSubmitBtn.innerHTML).toBe('✅ Saved!');
    });
    
    test('should disable submit button when username is valid', () => {
        mockInput.value = 'ValidUser123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockSubmitBtn.disabled).toBe(true);
    });
    
    test('should restore original button text after 2 seconds', () => {
        mockInput.value = 'ValidUser123';
        const originalText = mockSubmitBtn.innerHTML;
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockSubmitBtn.innerHTML).toBe('✅ Saved!');
        
        // Fast-forward time by 2 seconds
        jest.advanceTimersByTime(2000);
        
        expect(mockSubmitBtn.innerHTML).toBe(originalText);
    });
    
    test('should re-enable submit button after 2 seconds', () => {
        mockInput.value = 'ValidUser123';
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockSubmitBtn.disabled).toBe(true);
        
        // Fast-forward time by 2 seconds
        jest.advanceTimersByTime(2000);
        
        expect(mockSubmitBtn.disabled).toBe(false);
    });
    
    test('should not update button when username is invalid', () => {
        mockInput.value = 'short';
        const originalText = mockSubmitBtn.innerHTML;
        
        handleUsernameSubmit(mockEvent);
        
        expect(mockSubmitBtn.innerHTML).toBe(originalText);
        expect(mockSubmitBtn.disabled).toBe(false);
    });
    
    test('should handle empty username after trimming', () => {
        mockInput.value = '   ';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBeNull();
        expect(mockSubmitBtn.innerHTML).toBe('Save Username');
    });
    
    test('should handle minimum valid username length (7 characters with uppercase)', () => {
        mockInput.value = 'Valid12';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBe('Valid12');
        expect(mockSubmitBtn.innerHTML).toBe('✅ Saved!');
    });
    
    test('should reject username with exactly 6 characters', () => {
        mockInput.value = 'Valid1';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBeNull();
    });
    
    test('should accept username with multiple uppercase letters', () => {
        mockInput.value = 'ValidUserName';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBe('ValidUserName');
    });
    
    test('should accept username with special characters and uppercase', () => {
        mockInput.value = 'User@Name123!';
        
        handleUsernameSubmit(mockEvent);
        
        expect(localStorage.getItem('bucks2barUsername')).toBe('User@Name123!');
    });
});
