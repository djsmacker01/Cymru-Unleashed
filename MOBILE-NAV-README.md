# Mobile Navigation Implementation Guide

This guide explains how to implement the standardized mobile navigation across all pages of the Cymru Unleashed website.

## Files

The mobile navigation consists of three main files:

1. `mobile-nav.js` - Contains the JavaScript implementation
2. `mobile-nav.css` - Contains the CSS styles
3. `header-template.html` - Contains the HTML structure

## Implementation Steps

1. **Include Required Files**
   Add these lines in your HTML file's `<head>` section:
   ```html
   <link rel="stylesheet" href="/mobile-nav.css">
   <script src="/mobile-nav.js" defer></script>
   ```

2. **Add Required HTML Structure**
   Copy the contents of `header-template.html` into your page, replacing the existing header section. Make sure to:
   - Keep the overlay div at the top of the body
   - Maintain the exact same IDs and classes
   - Update the navigation links to match your page structure
   - Add the `active` class to the current page's link

3. **Required HTML Elements**
   Your page must have these elements with the exact IDs:
   ```html
   <div id="overlay" class="overlay"></div>
   <header id="header">
       <div class="container header-container">
           <a href="/index.html" class="logo">Cymru <span>Unleashed</span></a>
           <button class="hamburger" id="hamburger" aria-label="Toggle menu">
               <i class="fas fa-bars"></i>
           </button>
           <nav id="nav">
               <ul>
                   <!-- Navigation items -->
               </ul>
           </nav>
       </div>
   </header>
   ```

4. **Required Dependencies**
   Make sure your page includes:
   - Font Awesome for icons
   - Montserrat font
   - CSS variables for colors

## Features

The mobile navigation includes:
- Smooth animations
- Keyboard navigation support
- Focus management
- Touch-friendly interactions
- Responsive design
- Accessibility features

## CSS Variables

The navigation uses these CSS variables:
```css
:root {
    --primary: #D3071D;
    --secondary: #1E5631;
    --dark: #333;
    --light: #FFFFFF;
    --grey: #F6F6F6;
}
```

## Browser Support

The mobile navigation is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Troubleshooting

If the mobile navigation isn't working:
1. Check that all required files are included
2. Verify that element IDs match exactly
3. Ensure CSS variables are defined
4. Check browser console for errors
5. Verify that Font Awesome is loaded

## Accessibility

The navigation is built with accessibility in mind:
- ARIA labels for buttons
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast support
- Touch target sizes meet WCAG guidelines 