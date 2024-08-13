import ReactOnRails from 'react-on-rails';
// import "tailwindcss"
// import '~/stylesheets/application.scss';
const modules = import.meta.glob('../react/pages/**/*.tsx', { eager: true })

console.log("Registering modules...");
const registerModules = () => {
  const registeredModules = {};
  for (const [_, module] of Object.entries(modules)) {
    const defaultModule = module.default;
    registeredModules[defaultModule.name] = defaultModule;
  }
  console.log(registeredModules)
  return registeredModules;
};

ReactOnRails.register(registerModules());