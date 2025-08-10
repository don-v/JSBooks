/* A circular dependency is a situation where module A depends on B, and B also, 
directly or indirectly depends on A. Many module systems simply forbid this because 
whichiever order on chooses for loading such modules, one cananot make sure that each 
module's dependencies have been loaded before it runs.

'CommonJS' moculdes allow a limited form of cyclic dependencies. As long as the 
modules don't access each other's interface until after they finish loading, cyclic 
dependencies are okay. 

The `require` function given earlier in this chapter supports this type of dependency. 
Can you see how it handles cycles?
 */


function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let exports = require.cache[name] = {};
    let wrapper = Function("require, exports", code);
    wrapper(require, exports);
  }
  return require.cache[name];
}
require.cache = Object.create(null);
