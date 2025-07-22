/* These are the bindings that the project form *C7*` creates:

```js
roads
buildGraph
roadGraph
VillageState
runRobot
randomPick
randomRobot
mailRoute
routeRobot
findRoute
goalOrientedRobot
```

If one were to write that project as a modular program, 

what modules would one create? 

// I would put `randomRobot, routeRobot, and goalOrientedRobot` in their own 
// module since they are all 'robots'. I would put utilitiy functions in their 
// own module as well ...

utilities: `buildGraph`, `runRobot`, `VillageState`

Which module would depend on which other module?, and 

what would their interfaces look like?

Which pieces are likely to be available prewritten on 'NPM'? 

// `findRoute`

Would one prefer to use an 'NPM' package or write them oneself? 

// 
*/