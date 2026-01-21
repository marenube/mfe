declare module '/legacy/app.js' {
  const legacyApp: {
    mount(container: HTMLElement): void;
    unmount(): void;
  };

  export default legacyApp;
}
