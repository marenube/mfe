export {};

declare global {
  interface Window {
    __PLATFORM_NAV__?: {
      goRoot(): void;
    };
  }
}
