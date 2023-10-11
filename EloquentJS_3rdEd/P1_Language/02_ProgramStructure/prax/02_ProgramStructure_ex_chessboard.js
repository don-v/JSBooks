/* Write a program that creates a string that represents an 8 x 8 grid, using newline
characters to separate lines. At each position of the grid there is either a 
space or a `"#"` character. The characters should form a chessboard.

Passing this string to `console.log` should show something like this:

```
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #
```

When one has a program that generates this pattern, define a binding `size = 8`
and change the program that it works for any value assigned to `size`, outputting
a grid of the given width and height.
 */

let size = 8;

let row = "";

for (let w = 0; w < size; w++) {
    
    for (let h = 0; h < size; h++) {
        
        if (w % 2 === 0) {
            row += "#"
        } else {
            row += " "
        }

        if (h ) {
            
        } else {
            
        }

    }

}