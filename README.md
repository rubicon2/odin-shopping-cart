# Odin Shopping Cart Project

https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart

https://odin-mega-shop.netlify.app/

## Extra, Extra

Looking back at the project brief, I actually developed a number of extra features that were not required, which may go some way to explain why I spent so long on it. At least, that's my excuse.

- Integration with localforage API to save and load user data between sessions
- A product filter on the shop page that allows the user to narrow down the product listings
- A fully responsive layout that works on mobile and desktop

## Challenges

### Responsive Nav Bars

I tried to make a responsive nav bar like on my last project, but ran into some problems.

On my previous project, I just included the list of nav links twice. One was formatted for mobile, the other for desktop, and the styles would set `display: none` at certain
breakpoints using a css media query, so either the mobile version or the desktop version displayed and the other would be removed from the flow of the page.

On this project, I decided to try and reduce the duplication. However, what I have ended up with is a component that is extremely complicated and difficult to modify, since the
very different styling and behaviours are wrapped up together in one component.

I decided to fix this by creating a parent NavBar component, which defines the links and passes them as a prop to subcomponents: DesktopNavBar and MobileNavBar. The subcomponents define their own styling and behaviour, and the parent component controls which one to display. This means there will be only a max of one or two media queries in the parent component that determine which version of the NavBar is displayed. The components are now a lot simpler and easier to understand and modify.

### Testing React Controlled Components

Had some real issues testing out controlled inputs with testing library and userEvent. The fix was to re-render the component upon every keystroke, so the values in the element are updated properly. I guess I was taking the re-render for granted and forgot that I would have to trigger it myself within the tests.

## New Stuff I Learned About

- MSW (mock service worker) library for mocking fetch requests
- Testing library for testing out react components (there had been an Odin lesson before on this, but hadn't practiced very much)
- Writing custom react hooks
