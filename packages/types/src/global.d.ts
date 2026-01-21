export {};

declare global {
  interface Window {
    __LEGACY_APP__?: {
      mount: (container: HTMLElement) => void;
      unmount: () => void;

      Backbone?: {
        history: {
          navigate: (
            fragment: string,
            options?: {
              trigger?: boolean;
              replace?: boolean;
            }
          ) => void;
        };
      };
    };
  }
}
