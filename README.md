# Odin Shopping Cart Project

https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart

## Challenges

### Responsive Nav Bars

I tried to make a responsive nav bar like on my last project, but ran into some problems.

On my previous project, I just included the list of nav links twice. One was formatted for mobile, the other for desktop, and the styles would set `display: none` at certain
breakpoints using a css media query, so either the mobile version or the desktop version displayed and the other would be removed from the flow of the page.

On this project, I decided to try and reduce the duplication. However, what I have ended up with is a component that is extremely complicated and difficult to modify, since the
very different styling and behaviours are wrapped up together in one component.

Alternative approaches:

- Have a parent NavBar component, which defines the links, then passes them as a prop to subcomponents, DesktopNavBar and MobileNavBar. The subcomponents define their own styling
  and behaviour, the parent component controls which one to display. This means there will be only a max of one or two media queries in the parent component that determine which version of the NavBar is displayed.

### Styled components and the NavBasket component

Overall, the experience with styled components has been good. However, I keep running into odd issues where styles aren't applied until the page is refreshed.
In particular, the NavBasket component has a number that is displayed only when the number of items in the user's basket is more than zero. When the item count
is more than zero, the number is then condtionally rendered along with the rest of the component. For some reason, doing it this way resulted in the absolute
positioning of the element to change. Upon page refresh, it then would move to the correct position. I found positioning this element to be finicky in general
and not how I expected (e.g. adding `top: 0` or `right: 0` did not position the element to the top or the right side of the parent). I checked that the parent
had `position: relative` applied to create a new stacking context, so the absolute position would be relative to the parent element, not the root element, but
that didn't seem to be the issue.

Commenting out `position: absolute`, saving, and then uncommenting it and saving again also would cause the element to be positioned correctly.

This issue also occurred when the layout was adjusted between mobile and desktop versions, although I cannot remember particular details about that as I had already
spent days trying to figure out why this had been happening, and had at that point decided to just implement a workaround.

I also noticed that the dimensions of the parent element weren't what I expected. I expected them to match its content, but it did not. The dimensions seemed like
that of an empty element. This may have played some part in the strange behaviour of this component.

Regardless of whatever way I am getting the element positioned, or the dimensions of its parent, why would this happen?
I thought that maybe the css was being generated differently, or something was not being applied that should have been, but after comparing the css of the correctly
positioned element, and the css of the incorrectly positioned element, they were exactly the same. If the css is exactly the same, why would the visual presentation
be different?

I spent a lot of time trying to figure this out with not much to show for it. In the end I just used margins instead of absolute positioning to get the element
where I wanted it, and instead of conditionally rendering it, always render it but set `visibility: hidden` when the basket item count is zero. This meants the
basket icon is not quite vertically centered, as the basket counter pushes it up. This did not happen with absolute positioning, which was why I was trying to use
it in the first place, and it worked well when the browser wasn't intermittently forgetting how to position it.

Whatever the case - incredibly annoying. I will wrap this project up and hopefully later come to understand more about the inner workings of style-components and
what may cause issues like this.
