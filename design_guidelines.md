# WhatsApp Bot - Design Guidelines

## Design Approach
**Utility-Focused Design System**: This is primarily a backend Node.js service. Any frontend components (admin panel, configuration interface) should prioritize functionality and clarity over visual complexity.

**Selected System**: Clean, minimal interface inspired by developer tools like Railway, Vercel Dashboard, and Linear - focusing on readability and efficiency.

## Core Design Elements

### A. Color Palette
**Dark Mode** (Primary):
- Background: 217 33% 7% (deep slate)
- Surface: 217 25% 12% (card background)
- Border: 217 20% 20% (subtle borders)
- Text Primary: 0 0% 98% (high contrast)
- Text Secondary: 220 9% 65% (muted)
- Accent: 142 76% 45% (WhatsApp green for status/success)
- Error: 0 84% 60% (red for errors)

**Light Mode** (Secondary):
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Border: 220 13% 91%
- Text Primary: 220 9% 15%
- Accent: 142 70% 40%

### B. Typography
- **Font Family**: System fonts (via Tailwind's font-sans)
- **Headers**: font-semibold, text-2xl to text-lg
- **Body**: font-normal, text-sm to text-base
- **Code/Technical**: font-mono for API keys, webhooks, logs

### C. Layout System
**Spacing**: Consistent units of 4, 6, 8, 12, 16 (p-4, m-6, gap-8, py-12, etc.)
- Compact spacing for data-dense areas
- Generous padding for primary actions
- Consistent gap-4 for form elements

### D. Component Library

**Admin Dashboard Components**:
- **Status Cards**: Connection status, message count, active conversations
- **Configuration Forms**: Simple inputs for API credentials, webhook URLs
- **Log Viewer**: Monospace text area showing bot activity
- **Message Templates**: List view with edit/delete actions

**Navigation**: Simple sidebar or top nav with:
- Dashboard
- Configuration  
- Logs
- Templates (if applicable)

**Forms**: 
- Clean input fields with labels above
- Subtle focus states (ring-2 ring-accent)
- Clear validation messages

**Data Display**:
- Simple tables for logs/messages
- Status badges (green for active, gray for inactive)
- Timestamp formatting

### E. Interactions
**Minimal animations**: 
- Smooth transitions on hover (transition-colors duration-200)
- No elaborate animations - focus on speed and clarity
- Loading states: simple spinners, no complex skeletons

## Key Principles
1. **Developer-First**: Clear, readable, functional
2. **No Unnecessary Flourish**: Every element serves a purpose
3. **Mobile Responsive**: Stack on mobile, side-by-side on desktop
4. **Accessibility**: High contrast, keyboard navigation, clear focus states

## Images
No images required for this backend service interface. Use WhatsApp green accent color and clear iconography (Heroicons) for visual identity.