# GitHub Copilot Instructions for Bucks2bar Budget Tracker

## Project Overview
Bucks2bar is a client-side budget tracking web application that allows users to track monthly income and expenses across a 12-month period. The app provides data visualization, persistent storage, and an intuitive interface for financial planning.

## Tech Stack
- **HTML5** with Bootstrap 5.3.3 for UI
- **Vanilla JavaScript** (ES6+) for logic
- **Chart.js** for data visualization
- **localStorage** for data persistence
- No backend or build process required

## Code Style & Conventions

### JavaScript
- Use `const` and `let` (no `var`)
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Use `.querySelector()` and `.querySelectorAll()` for DOM selection
- Always use `.toFixed(2)` for currency values
- Handle null/undefined with `|| 0` fallback for numeric inputs

### HTML
- Use Bootstrap 5 classes for styling
- Use semantic HTML elements
- Add `data-*` attributes for JavaScript interaction
- Maintain consistent indentation (4 spaces)

### CSS
- Keep custom styles in the `<style>` tag in index.html
- Use Bootstrap utilities first, custom CSS only when needed
- Follow mobile-first responsive design

## Key Application Patterns

### UI elements
All buttons must be pink color

### Data Flow
1. User inputs data → `getCurrentData()`
2. Save to storage → `saveData(data)`
3. Update UI → `updateTotals()` + `updateChart(data)`

### Storage Pattern
```javascript
const STORAGE_KEY = 'bucks2barData';
// Structure: { income: [12 numbers], expenses: [12 numbers] }
```

### Event Handling
- Attach listeners on DOM ready
- Call `saveData()` after any data modification
- Update totals and chart after data changes
- Use event delegation for dynamic elements

## Important Constraints

### Data Structure
- Always maintain 12-month arrays
- Index 0 = January, Index 11 = December
- Store numbers, not strings (use `parseFloat()`)
- Default to 0 for empty values

### Chart Management
- Store chart instance in `chartInstance` global variable
- Always destroy previous chart before creating new one
- Use Chart.js syntax and patterns
- Update chart whenever data changes

### Currency Handling
- Use `type="number"` inputs with `step="0.01"`
- Display with `$` prefix and 2 decimal places
- Allow only positive values (`min="0"`)
- Parse with `parseFloat(input.value) || 0`

## When Adding Features

### New Calculations
- Work with the data arrays (income, expenses)
- Use `.reduce()`, `.map()`, `.filter()` for array operations
- Always validate numeric values
- Update totals display accordingly

### New UI Elements
- Use Bootstrap components and grid system
- Match existing color scheme (purple gradient header)
- Add to appropriate tab panel (data or chart)
- Ensure mobile responsiveness

### New Storage Fields
- Extend the data object structure
- Handle backwards compatibility with existing data
- Add migration logic if structure changes
- Test with and without existing localStorage

## Common Tasks

### Adding a Month-Based Metric
```javascript
const data = getCurrentData();
const newMetric = data.income.map((income, i) => {
    return income - data.expenses[i]; // Example: net savings
});
```

### Creating New Input Fields
```html
<input type="number" class="form-control currency-input custom-input" 
       data-month="0" step="0.01" min="0" placeholder="0.00">
```

### Adding Chart Datasets
```javascript
{
    label: 'New Dataset',
    data: dataArray,
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 2
}
```

## File Locations
- **UI**: index.html (all HTML, Bootstrap, and custom CSS)
- **Logic**: script.js (all JavaScript functionality)
- **No build files**: Direct browser execution

## Testing Approach
- Test with empty localStorage (first-time user)
- Test with existing data (returning user)
- Test random data generation
- Test clear data functionality
- Test manual data entry and validation
- Verify chart renders correctly
- Check responsive design on mobile

## Avoid These Patterns
- ❌ Don't use jQuery (use vanilla JS)
- ❌ Don't add server-side code
- ❌ Don't break the 12-month structure
- ❌ Don't forget to call `saveData()` after changes
- ❌ Don't create chart without destroying previous
- ❌ Don't use inline styles (use classes)
- ❌ Don't forget mobile responsiveness

## Preferred Patterns
- ✅ Use Bootstrap utilities for spacing/layout
- ✅ Keep functions pure and modular
- ✅ Add descriptive comments for complex logic
- ✅ Use semantic variable names
- ✅ Handle errors gracefully (try-catch for localStorage)
- ✅ Update all relevant UI elements after data changes
- ✅ Test across different screen sizes

## Dependencies (CDN)
- Bootstrap 5.3.3 CSS & JS
- Chart.js (if adding charts, reference version in index.html)
- No npm packages or build tools

## Browser APIs Used
- `localStorage` for persistence
- Standard DOM APIs for manipulation
- No cookies or external storage

## Future Considerations
When suggesting enhancements, consider:
- Export/import data (CSV, JSON)
- Budget goals and alerts
- Category-based expense tracking
- Multiple budget profiles
- Year-over-year comparisons
- Data visualization options (pie charts, bar charts)
- Budget recommendations based on patterns
- Print-friendly views

## Performance Tips
- Debounce input events if needed
- Chart updates can be expensive (batch if possible)
- localStorage is synchronous but fast for small data
- 12-month dataset is small (no pagination needed)

## Accessibility
- Maintain keyboard navigation
- Use proper HTML semantics
- Ensure adequate color contrast
- Add ARIA labels for screen readers where needed
- Test with keyboard-only navigation

## Debug Commands
```javascript
// View stored data
console.log(JSON.parse(localStorage.getItem('bucks2barData')));

// Clear storage
localStorage.removeItem('bucks2barData');

// Get current data from inputs
getCurrentData();
```

## Success Criteria
Code suggestions should:
1. Maintain data integrity
2. Work without a backend
3. Persist data to localStorage
4. Update UI in real-time
5. Follow Bootstrap conventions
6. Be mobile-responsive
7. Handle edge cases (empty data, invalid input)
8. Maintain existing functionality
